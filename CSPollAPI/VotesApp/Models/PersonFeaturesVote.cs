using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VotesApp.Models
{
    public class PersonFeaturesVote
    {
        public int Version { get; set; }
        public string Name { get; set; }
        public int PositionInVote { get; set; }
    }
}