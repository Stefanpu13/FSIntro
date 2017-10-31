using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using VotesApp.DAL;
using VotesApp.Models;

namespace VotesApp.Controllers
{
    [RoutePrefix("api")]
    public class VotesController : ApiController
    {
        [HttpGet]
        public IEnumerable<VoteResultModel> Index()
        {
            using (var ctx = new VotesDataContext())
            {
                var all =
                    ctx.VoteResults
                    .Select(v => new PersonFeaturesVote
                    {
                        Name = v.Name,
                        Version = v.FeatureVersion,
                        PositionInVote = v.PositionInVote

                    })
                    .GroupBy(vote => vote.Name)
                    // load collection in order to use "GetScore"
                    .ToList()
                    .Select(group => new VoteResultModel
                    {
                        Count = group.Count(),
                        Vote = group.Select(v => v).First(),
                        TotalScore =
                           group.Sum(v => GetScore(v.PositionInVote))
                    })
                    .OrderByDescending(vote => vote.TotalScore)
                    .ThenBy(vote => vote.Count)
                    .ThenByDescending(vote => vote.Vote.Version);

                return all;                
            }
        }

        [Route("votes/add")]
        [HttpPost]
        public IHttpActionResult Add(Guid voterId, [FromBody] IEnumerable<PersonFeaturesVote> newVotes)
        {
            using (var ctx = new VotesDataContext())
            {
                var voteResults =
                    newVotes
                    .Select(v => new VoteResult
                    {
                        Name = v.Name,
                        FeatureVersion = v.Version,
                        PositionInVote = v.PositionInVote,
                        VoterId = voterId.ToString()
                        
                    });

                ctx.VoteResults.InsertAllOnSubmit(voteResults);
                ctx.SubmitChanges();
            }

            return Ok("Vote successfull");
        }

        [HttpDelete]
        public IHttpActionResult Reset()
        {            
            using (var ctx = new VotesDataContext())
            {
                ctx.VoteResults.DeleteAllOnSubmit(ctx.VoteResults);
                ctx.SubmitChanges();
            }

            return Ok("Votes Deleted");
        }

        [Route("votes/RequestNew")]
        [HttpPost]
        public IHttpActionResult RequestNew(Guid voterId)
        {
            using (var ctx = new VotesDataContext())
            {
                var userVotes =
                         ctx.VoteResults
                         .Where(vr => vr.VoterId == voterId.ToString());

                ctx.VoteResults.DeleteAllOnSubmit(userVotes);
                ctx.SubmitChanges();
            }

            return Ok("New vote granted");
        }

        private int GetScore(int positionInVote)
        {
            return 6 - positionInVote;
        }
    }
}
