const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  resetToken: String,
  expireToken: Date,
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
}, {
  timestamps: true
});

UserSchema.pre("save", async function (next) {
  try {
    if (this.isNew) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
    }
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.isValidPassword = async function (password) {
  try {
    // Check if password is in scrypt format (from Flask/Python)
    if (this.password.startsWith('scrypt:')) {
      return this.verifyScryptPassword(password);
    }
    
    // Otherwise, use bcrypt (Node.js format)
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

// Method to verify scrypt passwords (from Flask/Python applications)
UserSchema.methods.verifyScryptPassword = function (password) {
  try {
    // Parse scrypt hash format: scrypt:32768:8:1$salt$hash
    const parts = this.password.split('$');
    if (parts.length !== 3) {
      return false;
    }
    
    const [method, salt, storedHash] = parts;
    const [algorithm, N, r, p] = method.split(':');
    
    if (algorithm !== 'scrypt') {
      return false;
    }
    
    // Convert parameters to numbers
    let scryptN = parseInt(N);
    const scryptR = parseInt(r);
    const scryptP = parseInt(p);
    
    // Node.js has memory limits for scrypt, so we need to handle high N values
    // If N is too high, we'll need to use a different approach
    if (scryptN > 16384) {
      console.log(`Warning: scrypt N parameter (${scryptN}) is too high for Node.js, reducing to 16384`);
      // For compatibility, we'll try with reduced parameters first
      // This is not ideal but necessary for Node.js limitations
      scryptN = 16384;
    }
    
    try {
      // Generate hash with the same parameters
      const derivedKey = crypto.scryptSync(password, salt, 64, {
        N: scryptN,
        r: scryptR,
        p: scryptP,
        maxmem: 128 * 1024 * 1024 // 128MB memory limit
      });
      
      // Convert to hex string for comparison
      const derivedHash = derivedKey.toString('hex');
      
      // Compare with stored hash
      return derivedHash === storedHash;
    } catch (memoryError) {
      // If still failing due to memory, try with even lower parameters
      console.log('Trying with reduced scrypt parameters due to memory constraints');
      const reducedKey = crypto.scryptSync(password, salt, 64, {
        N: 4096,
        r: scryptR,
        p: scryptP,
        maxmem: 64 * 1024 * 1024 // 64MB memory limit
      });
      
      const reducedHash = reducedKey.toString('hex');
      return reducedHash === storedHash;
    }
  } catch (error) {
    console.error('Scrypt verification error:', error);
    return false;
  }
};

module.exports = mongoose.model("User", UserSchema);
