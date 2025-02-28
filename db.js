const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('your_mongodb_connection_string', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Course schema
const courseSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

// Define the User schema
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    enrolledCourses: [{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }],
    created_at: {
        type: Date,
        default: Date.now
    }
});

// Create models from the schemas
const Course = mongoose.model('Course', courseSchema);
const User = mongoose.model('User', userSchema);

module.exports = { Course, User };