using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class Feedback
    {
        public int FeedbackId { get; set; }

        public string UserId { get; set; }

        public string TopicId { get; set; }

        public string MessageValue { get; set; }
    }
}
