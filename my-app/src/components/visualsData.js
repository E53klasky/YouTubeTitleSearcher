function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
  }
}
export function highlightWord(arr, word){

  const parts = arr[0].split(" ");
  let before = [];
  let after = [];
  for (let i = 0; i < parts.length; i++){
    if (parts[i] == word){
      parts[i] = "";
      for(let j = 0; j < i; j++){
        before[j] = parts[j]
        parts[j] = "";
      }
      break;
    }
  }
  for (let i = before.length; i < parts.length; i++){
    after[i] = parts[i];
  }
  return([<p key="0">{before.join(" ")} <mark>{word}</mark> {after.join(" ")} </p>]);
}
function youtubeData() {
  let arr = [
    ["The SECRET to Building the Ultimate PC", 128456, 2134, 134],
    ["How to Build a PC for $500 (Ultimate Guide)", 352460, 12001, 458],
    ["What Happens If You Don't Sleep for 72 Hours?", 530129, 8321, 220],
    ["Top 10 WORST Movies Ever Made", 476902, 3478, 56],
    ["I Tried Living Without Wi-Fi for a Week", 233912, 8421, 321],
    ["Building a Tiny House from Scratch 🏠", 129874, 10450, 115],
    ["The TRUTH About the Bermuda Triangle ", 467820, 21003, 0],  // comments off
    ["How to Make $1000 a Week Online", 128495, 12001, 789],
    ["This is What Happens to Your Body When You Stop Drinking Water", 384720, 15320, 264],
    ["The MOST Dangerous Animal in the World", 580137, 21530, 804],
    ["Exploring Abandoned Places in the Middle of Nowhere", 292849, 9243, 167],
    ["10 Things You DIDN'T Know About the Universe 🌌", 685291, 19382, 525],
    ["Why Everyone Is Obsessed with Minimalism", 539282, 8541, 320],
    ["Behind the Scenes of HOLLYWOOD Blockbusters", 720195, 31456, 654],
    ["Can You Survive 30 Days in the Wilderness?", 456103, 13470, 0],  // comments off
    ["Eating ONLY Pizza for 30 Days", 315027, 6543, 189],
    ["Why Is Everyone Talking About THIS New AI?", 129438, 19823, 502],
    ["I Survived the World's Worst Flight!", 208421, 5231, 31],
    ["What Would Happen If We Lived on MARS?", 342869, 8762, 132],
    ["We Bought the Cheapest HOUSE in the U.S. (See What Happened)", 590204, 39210, 1043],
    ["You WON'T Believe What I Found Under My House!", 493824, 23472, 874],
    ["The Craziest Things Found in Abandoned Mansions", 741056, 14123, 0],  // comments off
    ["I Made a $100,000 Video Game in One Month", 238974, 11234, 467],
    ["The FASTEST Way to Learn a New Language", 563248, 8765, 123],
    ["Reacting to My OLD YouTube Videos (Cringe)", 745021, 54029, 812],
    ["How to Stay Productive When You’re Always TIRED", 312467, 9803, 65],
    ["Is the Earth FLAT? Debunking the Myths", 489347, 32480, 934],
    ["I Spent 24 HOURS in a Haunted Hotel", 600128, 21001, 0],  // comments off
    ["The Most Expensive Gadgets in the World", 238410, 15723, 410],
    ["How I Made $10,000 by Selling Art Online", 582043, 13432, 512],
    ["The History of Video Games: From Pong to VR", 567832, 31578, 678],
    ["Exploring DEEP Sea Creatures", 392547, 15892, 350],
    ["I Tried To Live Like a Caveman for a Week", 299532, 6231, 224],
    ["What’s Inside the Most Expensive Watches?", 589274, 24937, 539],
    ["The TRUTH About the World's Most Dangerous Road", 738021, 13302, 61],
    ["Trying Out the MOST Dangerous Foods", 475820, 27512, 230],
    ["What Happens If You Stay Awake for 100 Hours?", 324789, 8756, 194],
    ["The Most BEAUTIFUL Places in the World 🌍", 568204, 18024, 462],
    ["Why This AI Is CHANGING Everything", 410290, 22301, 134],
    ["The Science Behind TIME Travel", 687452, 11934, 88],
    ["I Bought a Mansion for $1", 431095, 26482, 331],
    ["This Is What Happens When You Go Over the Speed Limit 🚗", 294103, 8650, 0],  // comments off
    ["The Fastest Cars in the WORLD (2024)", 567124, 30287, 411],
    ["Living Without Social Media for a Month", 492816, 7450, 345],
    ["What’s Really Going On in Area 51?", 672049, 18234, 560],
    ["How to Get Into MIT: My Journey", 301254, 2134, 88],
    ["Unsolved Mysteries That Will Blow Your Mind", 586729, 25467, 230],
    ["I Survived 7 Days in the Wilderness Alone", 473201, 32870, 530],
    ["Why You Should Start Investing Now", 634512, 19872, 412],
    ["The World's Most Expensive Foods", 455098, 19873, 287],
    ["What's Inside a Boeing 747?", 594670, 27641, 120],
    ["I Tried to Break a World Record", 401298, 14562, 345],
    ["The Most Unusual Places in the World", 782134, 34270, 672],
    ["How I Built a $1M Business from Scratch", 324578, 19020, 150],
    ["The Best Life Hacks You've Never Heard Of", 483264, 23411, 532],
    ["How to Turn Your Hobby Into a Business", 596830, 23142, 489],
    ["I Took a Road Trip Across the U.S. 🇺🇸", 529803, 34210, 189],
    ["Why This AI Is the Future of Everything", 295876, 14234, 220],
    ["Can You Solve These Mind-Bending Puzzles?", 346925, 13301, 457],
    ["The Most Expensive Collectibles Ever Sold", 427162, 29802, 740],
    ["The Dark Web: What You Need to Know", 520381, 10293, 56],
    ["Living in the Most Expensive City in the World", 602384, 25589, 112],
    ["How to Make Money in Cryptocurrency 💰", 318560, 12211, 412],
    ["I Ate Only Fast Food for 30 Days", 434172, 23789, 344],
    ["How to Build a Robot from Scratch", 563972, 13401, 158],
    ["The Top 5 MOST Dangerous Sports", 674203, 30500, 189],
    ["My Journey to Becoming a Millionaire", 528738, 27810, 431],
    ["The Most Popular Online Games Right Now", 623467, 19123, 374],
    ["Can You Live Without Water for a Week?", 518612, 14678, 83],
    ["How to Live a Healthier Life", 484690, 13472, 213],
    ["Exploring the Ancient Pyramids of Egypt", 593420, 28109, 509],
    ["The Power of Meditation 🧘", 346789, 5674, 70],
    ["How to Create Your Own App in 30 Days", 389278, 12345, 322],
    ["The Best Ways to Save Money on a Budget", 542678, 15523, 410],
    ["How to Travel the World on a Budget", 604185, 23492, 321],
    ["The Truth About Aliens", 621543, 30987, 89],
    ["What Happens When You Put Soda in a Freezer?", 276430, 8723, 198],
    ["Top 10 Bizarre Foods Around the World", 529100, 24123, 490],
    ["How to Make $5000 a Month Online", 410238, 29587, 233],
    ["Why You Should Visit Japan 🇯🇵", 314572, 17842, 130],
    ["The STRANGEST Things Found in Space", 534918, 25467, 98],
    ["How to Become a Digital Nomad", 493720, 30589, 65],
    ["The BEST Budget Laptops for Students", 383675, 12659, 487],
    ["Why You Should Start Reading Every Day", 628401, 11345, 120],
    ["The Science of Dreams", 510294, 19034, 142],
    ["How to Make Your First $1000 Online", 497165, 13845, 509],
    ["Can You Survive a Shark Attack? 🦈", 523940, 14987, 389],
    ["Exploring the Best Beaches in the World", 479302, 29034, 402],
    ["How to Improve Your Mental Health", 341723, 16543, 380],
    ["The Most Dangerous Jobs in the World", 605217, 31250, 245],
    ["What Really Happens Inside a Prison?", 542987, 23687, 298],
    ["How to Make the Perfect Cup of Coffee", 318736, 29020, 263],
    ["Top 10 Most Expensive Cars in the World", 478963, 25784, 511],
    ["Why You Need to Stop Procrastinating", 356472, 18523, 75],
    ["The Future of Electric Cars", 593672, 23457, 412],
    ["How to Live a Zero Waste Lifestyle", 489234, 12897, 128],
    ["How to Get Into Harvard (My Story)", 371002, 17324, 239],
    ["The World's Largest Insects", 587412, 11934, 103],
    ["Making the World's Smallest Pizza 🍕", 541263, 18450, 420],
    ["How to Overcome Your Fears", 383456, 29587, 99],
    ["Exploring the Most Remote Places on Earth", 647238, 14258, 301],
    ["The MOST Beautiful Libraries in the World", 456971, 21001, 79],
    ];
    shuffleArray(arr);
  return(arr);};

export default youtubeData;
