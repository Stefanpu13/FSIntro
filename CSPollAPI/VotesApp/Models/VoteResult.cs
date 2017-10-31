using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VotesApp.Models
{
    public class VoteResultModel
    {
        public int Count { get; set; }
        public PersonFeaturesVote Vote { get; set; }
        public int TotalScore { get; set; }
    }
}