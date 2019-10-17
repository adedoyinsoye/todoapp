var TaskSchema = new Schema({
    name: {
      type: String,
      required: 'CODE'
    },
    Created_date: {
      type: Date,
      default: Date.now
    },
    status: {
      type: [{
        type: String,
        enum: ['pending', 'ongoing', 'completed']
      }],
      default: ['pending']
    }
  });
  
  module.exports = mongoose.model('Tasks', TaskSchema);