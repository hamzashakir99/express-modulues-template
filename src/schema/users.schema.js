const { isEmail } = validator;
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      default: null,
    },
    user_name: {
      type: String,
      trim: true,
      unique: true,
      validate(value) {
        if (!validator.matches(value, dataConstraint.USERNAME)) {
          throw new Error("From DB Schema -> User Name Not Valid");
        }
      },
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: true,
      validate(value) {
        if (!isEmail(value, { domain_specific_validation: true })) {
          throw new Error("From DB Schema -> Email Format Not Valid");
        }
      }
    },
    password: {
      type: String,
      trim: true,
      default: null,
    },
    jwt_token: [
      {
        token: {
          type: String,
          default: null
        },
        device_info: {
          type: Object,
          default: {
            device_type: null,
            device_vendor: null,
            os: null,
            os_version: null,
            browser: null,
            browser_version: null,
          }
        },
        login_date: {
          type: Date,
          default: new Date()
        },
        notification_token: {
          type: String,
          default: null
        }
      }
    ],
    email_verify: {
      type: Boolean,
      default: false
    },
    stripe_customer_id: {
      type: String,
      unique: true,
      default: null
    },
    user_type: {
      type: String,
      default: 'user',
      enum: ['user', 'admin']
    },
    verification_code: {
      type: String,
      default: null
    },
    expire_date: {
      type: Date,
      trim: true,
      default: null,
    },
    profile_image: {
      type: String,
      default: null
    },
    bio: {
      type: String,
      default: null
    },
    google_details: {
        is_google_connected: {
          type: Boolean,
          default: false
        },
        email: {
          type: String,
          default: null
        },
        access_token: {
          type: String,
          default: null
        },
        id: {
          type: String,
          default: null
        },
        email_verified: {
          type: Boolean,
          default: false
        }
    },
    notification: [
      {
        date: {
          type: Date
        },
        status: {
          type: Boolean,
          default: false
        },
        data: {
          type: Object
        },
        title: {
          type: String,
        },
        body: {
          type: String,
        },
        send_by: {
          type: String
        }
      }
    ],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Users", userSchema);