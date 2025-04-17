//Install Framer Motion for Animations: npm install framer-motion @mui/material @emotion/react @emotion/styled
import useYoutubeData from '../hooks/useYoutubeData.js';
import React, { useEffect, useRef, useState } from 'react';
import { 
  Typography, 
  Box, 
  Paper, 
  Avatar, 
  createTheme, 
  ThemeProvider,
  TextField,
  AppBar, 
  Toolbar, 
  Button, 
  IconButton,
  Stack,
} from '@mui/material';
import '@fontsource/poppins';
import HomeIcon from '@mui/material/Icon';
import { motion } from "framer-motion";
import Divider, {dividerClasses} from '@mui/material/Divider'
import youtubeData from './visualsData';
import highlightWord from './visualsData';
import { input } from 'framer-motion/client';
import TrieAnimation from './TrieAnimation.js';


const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, Roboto , sans-serif',
    h2: {
      fontWeight: 600,
    },
  },
});

const commentsData = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "/api/placeholder/50/50",
    comment: "This generator helped me increase my click-through rate by 45%! My channel is growing faster than ever.",
  },
  {
    id: 2,
    name: "Mark Rodriguez",
    avatar: "/api/placeholder/50/50",
    comment: "I was struggling with title ideas until I found this tool. Now I never run out of catchy titles!",
  },
  {
    id: 3,
    name: "Jamie Lee",
    avatar: "/api/placeholder/50/50",
    comment: "Super easy to use and gives amazing results. My latest video got 10K views in just 24 hours!",
  },
  {
    id: 4,
    name: "Alex Chen",
    avatar: "/api/placeholder/50/50",
    comment: "As a new YouTuber, this tool has been a game-changer for my channel's growth strategy.",
  },
  {
    id: 5,
    name: "Emily Wilson",
    avatar: "/api/placeholder/50/50",
    comment: "I've tried other title generators, but this one understands YouTube's algorithm perfectly!",
  },
  {
    id: 6,
    name: "David Thompson",
    avatar: "/api/placeholder/50/50",
    comment: "My subscriber count doubled since I started using these catchy titles. Highly recommended!",
  },
  {
    id: 7,
    name: "Sophia Garcia",
    avatar: "/api/placeholder/50/50",
    comment: "The titles it suggests actually match my content and get me more views. I'm impressed!",
  },
  {
    id: 8,
    name: "Ryan Patel",
    avatar: "/api/placeholder/50/50",
    comment: "This tool saved me hours of brainstorming. Now I spend more time creating and less time on titles.",
  },
  {
    id: 9,
    name: "Olivia Martinez",
    avatar: "/api/placeholder/50/50",
    comment: "My latest video went viral thanks to the perfect title! This generator is pure gold.",
  },
  {
    id: 10,
    name: "Michael Kim",
    avatar: "/api/placeholder/50/50",
    comment: "Finally breaking 100K subs after using these title strategies. Can't thank this tool enough!",
  },
  {
    id: 11,
    name: "Taylor Scott",
    avatar: "/api/placeholder/50/50",
    comment: "The engagement on my videos improved dramatically with these attention-grabbing titles.",
  },
  {
    id: 12,
    name: "Jordan Williams",
    avatar: "/api/placeholder/50/50",
    comment: "I was skeptical at first, but the results speak for themselves. My CTR is up by 32%!",
  },
];

const CommentCard = ({ comment }) => {
  return (
    <Paper 
      elevation={2} 
      sx={{ 
        p: 2,
        mx: 1,
        minWidth: 280,
        maxWidth: 280,
        borderRadius: 2,
        backgroundColor: '#202020', // YouTube dark theme
        borderTop: '3px solid #FF0000', // YouTube red accent
      }}
    >
      <Box display="flex" alignItems="center" mb={1}>
        <Avatar src={comment.avatar} sx={{ mr: 2 }} />
        <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#FFFFFF' }}>
          {comment.name}
        </Typography>
      </Box>
      <Typography variant="body2" sx={{ color: '#FFFFFF' }}>{comment.comment}</Typography>
    </Paper>
  );
};

const YouTubeLogo = () => (
  <svg 
    viewBox="0 0 90 20" 
    preserveAspectRatio="xMidYMid meet" 
    focusable="false" 
    style={{ width: '100%', maxWidth: '180px', height: 'auto' }}
  >
    <g viewBox="0 0 90 20" preserveAspectRatio="xMidYMid meet">
      <g>
        <path 
          d="M27.9727 3.12324C27.6435 1.89323 26.6768 0.926623 25.4468 0.597366C23.2197 2.24288e-07 14.285 0 14.285 0C14.285 0 5.35042 2.24288e-07 3.12323 0.597366C1.89323 0.926623 0.926623 1.89323 0.597366 3.12324C2.24288e-07 5.35042 0 10 0 10C0 10 2.24288e-07 14.6496 0.597366 16.8768C0.926623 18.1068 1.89323 19.0734 3.12323 19.4026C5.35042 20 14.285 20 14.285 20C14.285 20 23.2197 20 25.4468 19.4026C26.6768 19.0734 27.6435 18.1068 27.9727 16.8768C28.5701 14.6496 28.5701 10 28.5701 10C28.5701 10 28.5677 5.35042 27.9727 3.12324Z" 
          fill="#FF0000"
        ></path>
        <path d="M11.4253 14.2854L18.8477 10.0004L11.4253 5.71533V14.2854Z" fill="white"></path>
      </g>
      <g>
        <path d="M34.6024 13.0036L31.3945 1.41846H34.1932L35.3174 6.6701C35.6043 7.96361 35.8136 9.06662 35.95 9.97913H36.0323C36.1264 9.32532 36.3381 8.22937 36.665 6.68892L37.8291 1.41846H40.6278L37.3799 13.0036V18.561H34.6001V13.0036H34.6024Z" fill="#FFFFFF"></path>
        <path d="M41.4697 18.1937C40.9053 17.8127 40.5031 17.22 40.2632 16.4157C40.0257 15.6114 39.9058 14.5437 39.9058 13.2078V11.3898C39.9058 10.0422 40.0422 8.95805 40.315 8.14196C40.5878 7.32588 41.0135 6.72851 41.592 6.35457C42.1706 5.98063 42.9302 5.79248 43.871 5.79248C44.7976 5.79248 45.5384 5.98298 46.0981 6.36398C46.6555 6.74497 47.0647 7.34234 47.3234 8.15137C47.5821 8.96275 47.7115 10.0422 47.7115 11.3898V13.2078C47.7115 14.5437 47.5845 15.6161 47.3329 16.4251C47.0812 17.2365 46.672 17.8292 46.1075 18.2031C45.5431 18.5771 44.7764 18.7652 43.8098 18.7652C42.8126 18.7675 42.0342 18.5747 41.4697 18.1937ZM44.6353 16.2323C44.7905 15.8231 44.8705 15.1575 44.8705 14.2309V10.3292C44.8705 9.43077 44.7929 8.77225 44.6353 8.35833C44.4777 7.94206 44.2026 7.7351 43.8074 7.7351C43.4265 7.7351 43.156 7.94206 43.0008 8.35833C42.8432 8.77461 42.7656 9.43077 42.7656 10.3292V14.2309C42.7656 15.1575 42.8408 15.8254 42.9914 16.2323C43.1419 16.6415 43.4123 16.8461 43.8074 16.8461C44.2026 16.8461 44.4777 16.6415 44.6353 16.2323Z" fill="#FFFFFF"></path>
        <path d="M56.8154 18.5634H54.6094L54.3648 17.03H54.3037C53.7039 18.1871 52.8055 18.7656 51.6061 18.7656C50.7759 18.7656 50.1621 18.4928 49.767 17.9496C49.3719 17.4039 49.1743 16.5526 49.1743 15.3955V6.03751H51.9942V15.2308C51.9942 15.7906 52.0553 16.188 52.1776 16.4256C52.2999 16.6631 52.5045 16.783 52.7914 16.783C53.036 16.783 53.2712 16.7078 53.497 16.5573C53.7228 16.4067 53.8874 16.2162 53.9979 15.9858V6.03516H56.8154V18.5634Z" fill="#FFFFFF"></path>
        <path d="M64.4755 3.68758H61.6768V18.5629H58.9181V3.68758H56.1194V1.42041H64.4755V3.68758Z" fill="#FFFFFF"></path>
        <path d="M71.2768 18.5634H69.0708L68.8262 17.03H68.7651C68.1654 18.1871 67.267 18.7656 66.0675 18.7656C65.2373 18.7656 64.6235 18.4928 64.2284 17.9496C63.8333 17.4039 63.6357 16.5526 63.6357 15.3955V6.03751H66.4556V15.2308C66.4556 15.7906 66.5167 16.188 66.639 16.4256C66.7613 16.6631 66.9659 16.783 67.2529 16.783C67.4974 16.783 67.7326 16.7078 67.9584 16.5573C68.1842 16.4067 68.3488 16.2162 68.4593 15.9858V6.03516H71.2768V18.5634Z" fill="#FFFFFF"></path>
        <path d="M80.609 8.0387C80.4373 7.24849 80.1621 6.67699 79.7812 6.32186C79.4002 5.96674 78.8757 5.79035 78.2078 5.79035C77.6904 5.79035 77.2059 5.93616 76.7567 6.23014C76.3075 6.52412 75.9594 6.90747 75.7148 7.38489H75.6937V0.785645H72.9773V18.5608H75.3056L75.5925 17.3755H75.6537C75.8724 17.7988 76.1993 18.1304 76.6344 18.3774C77.0695 18.622 77.554 18.7443 78.0855 18.7443C79.038 18.7443 79.7412 18.3045 80.1904 17.4272C80.6396 16.5476 80.8653 15.1765 80.8653 13.3092V11.3266C80.8653 9.92722 80.7783 8.82892 80.609 8.0387ZM78.0243 13.1492C78.0243 14.0617 77.9867 14.7767 77.9114 15.2941C77.8362 15.8115 77.7115 16.1808 77.5328 16.3971C77.3564 16.6158 77.1165 16.724 76.8178 16.724C76.585 16.724 76.371 16.6699 76.1734 16.5594C75.9759 16.4512 75.816 16.2866 75.6937 16.0702V8.96062C75.7877 8.6196 75.9524 8.34209 76.1852 8.12337C76.4157 7.90465 76.6697 7.79646 76.9401 7.79646C77.2271 7.79646 77.4481 7.90935 77.6034 8.13278C77.7609 8.35855 77.8691 8.73485 77.9303 9.26636C77.9914 9.79787 78.022 10.5528 78.022 11.5335V13.1492H78.0243Z" fill="#FFFFFF"></path>
        <path d="M84.8657 13.8712C84.8657 14.6755 84.8892 15.2776 84.9363 15.6798C84.9833 16.0819 85.0821 16.3736 85.2326 16.5594C85.3831 16.7428 85.6136 16.8345 85.9264 16.8345C86.3474 16.8345 86.639 16.6699 86.7942 16.343C86.9518 16.0161 87.0365 15.4705 87.0506 14.7085L89.4824 14.8519C89.4965 14.9601 89.5035 15.1106 89.5035 15.3011C89.5035 16.4582 89.186 17.3237 88.5534 17.8952C87.9208 18.4667 87.0247 18.7536 85.8676 18.7536C84.4777 18.7536 83.504 18.3185 82.9466 17.446C82.3869 16.5735 82.1094 15.2259 82.1094 13.4008V11.2136C82.1094 9.33452 82.3987 7.96105 82.9772 7.09558C83.5558 6.2301 84.5459 5.79736 85.9499 5.79736C86.9165 5.79736 87.6597 5.97375 88.1771 6.32888C88.6945 6.684 89.059 7.23433 89.2707 7.98457C89.4824 8.7348 89.5882 9.76961 89.5882 11.0913V13.2362H84.8657V13.8712ZM85.2232 7.96811C85.0797 8.14449 84.9857 8.43377 84.9363 8.83593C84.8892 9.2381 84.8657 9.84722 84.8657 10.6657V11.5641H86.9283V10.6657C86.9283 9.86133 86.9001 9.25221 86.846 8.83593C86.7919 8.41966 86.6931 8.12803 86.5496 7.95635C86.4062 7.78702 86.1851 7.7 85.8864 7.7C85.5854 7.70235 85.3643 7.79172 85.2232 7.96811Z" fill="#FFFFFF"></path>
      </g>
    </g>
  </svg>
);

const HorizontalInfiniteScrollComments = () => {
  const scrollContainerRef = useRef(null);
  const [displayedComments, setDisplayedComments] = useState([]);
  const [scrollDirection, setScrollDirection] = useState('right');
  const [scrollSpeed, setScrollSpeed] = useState(1);
  
  useEffect(() => {
    setDisplayedComments([...commentsData, ...commentsData, ...commentsData, ...commentsData]);
  }, []);
  
  // Handle user scroll to change direction and speed
  const handleWheel = (e) => {
    e.preventDefault();
    
    // Determine scroll direction based on deltaX NOT NEEDED
    // if (e.deltaX !== 0) {
    //   setScrollDirection(e.deltaX > 0 ? 'right' : 'left');
    //   // Increase scroll speed (capped at 5)
    //   setScrollSpeed(prev => Math.min(prev + 0.5, 5));
    // } else if (e.deltaY !== 0) {
    //   setScrollDirection(e.deltaY > 0 ? 'right' : 'left');
    //   // Increase scroll speed (capped at 5)
    //   setScrollSpeed(prev => Math.min(prev + 0.5, 5));
    // }
    
    setTimeout(() => {
      setScrollSpeed(1);
    }, 1500);
  };
  
  useEffect(() => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    
    container.scrollLeft = container.scrollWidth * 0.25;
    
    let animationId;
    const autoScroll = () => {
      if (container) {
        const totalWidth = container.scrollWidth;
        const visibleWidth = container.clientWidth;
        const maxScrollLeft = totalWidth - visibleWidth;
        
        // Calculate new position based on direction and speed
        let newPosition = container.scrollLeft + (scrollDirection === 'right' ? scrollSpeed : -scrollSpeed);
        
        // Reset position when we reach the end to create infinite scroll effect
        if (newPosition >= maxScrollLeft - 10) {
          newPosition = maxScrollLeft / 4;
        } else if (newPosition <= 10) {
          newPosition = maxScrollLeft * 0.75;
        }
        
        container.scrollLeft = newPosition;
      }
      
      animationId = requestAnimationFrame(autoScroll);
    };
    
    animationId = requestAnimationFrame(autoScroll);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [scrollDirection, scrollSpeed, displayedComments]);
  
  return (
    <Box 
      ref={scrollContainerRef}
      onWheel={handleWheel}
      sx={{ 
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        overflowX: 'scroll',
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
          display: 'none'
        },
        py: 2
      }}
    >
      {displayedComments.map((comment, index) => (
        <CommentCard key={`${comment.id}-${index}`} comment={comment} />
      ))}
    </Box>
  );
};
{/*Half chatgpted*/}
export const Navbar = () => {
  return (
    <AppBar position="sticky" sx = {{background: 'rgba(0,0,0, .4)'}}>
      <Toolbar>
        {/* Icon on the left */}
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <HomeIcon /> {/* You can replace this with your desired icon */}
        </IconButton>

        {/* Navbar Title (optional) */}
        <Typography variant="h6" color = 'rgb(201, 196, 196)' align='left' sx={{ flexGrow: 1, textShadow: '0px 2px 4px rgba(0,0,0, 0.7)'}}>
          YouTube Title Searcher
        </Typography>

        {/* Buttons */}
        <Button color="inherit" href="https://www.google.com" sx = {{color: 'rgb(201, 196, 196)', fontSize: '19px'}}>Home</Button>
        <Button color="inherit" href="https://www.google.com/maps" sx = {{color: 'rgb(201, 196, 196)', fontSize: '19px'}}>Search</Button>
        <Button color="inherit" href="https://www.google.com/drive" sx = {{color: 'rgb(201, 196, 196)', fontSize: '19px'}}>About</Button>
      </Toolbar>
    </AppBar>
  );
}
export function ScrollingStack(inputWord) {
  const { data, loading } = useYoutubeData();
  const word = inputWord || "";
  
  // If data is empty or loading, show a placeholder
  if (!data || loading || data.length === 0) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
        <Typography>Loading YouTube data...</Typography>
      </Box>
    );
  }
  
  // Create a highlighted version of each video title
  const processedData = data.map(item => {
    const title = item.Title || "";
    let highlightedContent;
    
    if (word && typeof word === 'string' && typeof title === 'string') {
      const parts = title.split(new RegExp(`(${word})`, 'gi'));
      highlightedContent = (
        <p key={`highlight-${title}`}>
          {parts.map((part, index) => (
            part.toLowerCase() === word.toLowerCase() ? 
            <mark key={index}>{part}</mark> : 
            <React.Fragment key={index}>{part}</React.Fragment>
          ))}
        </p>
      );
    } else {
      highlightedContent = <p key={`default-${title}`}>{title}</p>;
    }
    
    // Ensure all values are numbers and not undefined
    const views = typeof item.Views === 'number' ? item.Views : 0;
    const likes = typeof item.Likes === 'number' ? item.Likes : 0;
    const comments = typeof item.Comments === 'number' ? item.Comments : 0;
    
    return [highlightedContent, views, likes, comments];
  });
  
  // Make a copy to avoid mutating the original
  let displayArr = [...processedData];
  
  // Repeat the data to have enough for scrolling animation
  while (displayArr.length < 100) {
    displayArr = [...displayArr, ...processedData];
  }
  displayArr = displayArr.slice(0, 100);
  
  return (
    <Box sx={{ overflow: "hidden", height: "inherit", display: "flex", justifyContent: "center"}}>
      <motion.div
        animate={{ y: ["0%", "-1370%"]}} 
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        style={{ width: "100%" }}
      >
        <Stack spacing={1} sx={{ width: "100%" }}>
          {displayArr.map((row, index) => (
            <Box
              key={index}
              sx={{
                width: "95.5%",
                height: 50,
                backgroundColor: "black",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                color: "white",
                fontSize: "1.2rem",
                borderRadius: 1,
                margin: "10px",
                paddingLeft: "10px", 
                paddingRight: "10px", 
                boxShadow: index % processedData.length === 0 ? "0px 0px 4px 2px rgba(255, 217, 0, .4)" : "none",
                [`& .${dividerClasses.root}`]: {
                  mx: 1,
                }
              }}
            >
              <Box sx={{ flexGrow: 1, maxWidth: "60%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {row[0]}
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Divider color="red" orientation='vertical' variant="middle" flexItem/>
                <Box sx={{ width: "80px", textAlign: "right" }}>{row[1].toLocaleString()}</Box>
                <Divider color="red" orientation='vertical' variant="middle" flexItem/>
                <Box sx={{ width: "80px", textAlign: "right" }}>{row[2].toLocaleString()}</Box>
                <Divider color="red" orientation='vertical' variant="middle" flexItem/>
                <Box sx={{ width: "80px", textAlign: "right" }}>{row[3].toLocaleString()}</Box>
              </Box>
            </Box>
          ))}
        </Stack>
      </motion.div>
    </Box>
  );
}




const exampleTrie = {
  char: "",
  isEnd: false,
  children: {
    a: {
      char: "a",
      isEnd: false,
      children: {
        t: {
          char: "t",
          isEnd: true,
          children: {},
        },
      },
    },
    b: {
      char: "b",
      isEnd: false,
      children: {
        a: {
          char: "a",
          isEnd: false,
          children: {
            d: {
              char: "d",
              isEnd: true,
              children: {},
            },
          },
        },
      },
    },
  },
};



function LandingPage() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh',
        overflow: 'hidden',
        background: 'linear-gradient(160deg, rgb(126, 38, 38) 5%, rgb(29, 29, 29) 50%)',
        //backgroundImage: 'url(/1336986.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}>
        {/* Header Section with Title and Logo */}
        <Navbar/>
        <Box 
          sx={{ 
            width: '100%', 
            textAlign: 'center',
            pt: 15,
            mb: 2,
            zIndex: 10,
            pb: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              fontWeight: 'bold',
              color: "rgb(201, 196, 196)", 
              textShadow: '0px 2px 4px rgb(0,0,0)',
              //mb: 2 
            }}
          >
            Test Title Here!
          </Typography>
          
          {/* YouTube Logo
          <Box 
            sx={{ 
              display: 'flex',
              justifyContent: 'center',
              width: '180px', 
              mb: 3 
            }}
          >
            <YouTubeLogo />
          </Box> */}
        </Box>
        
        {/* Main content area */}
        <Box sx={{ 
          display: 'flex', 
          //flexGrow: 1, 
          position: 'relative',
          //flexDirection: 'column',
          justifyContent: 'space-between',
          //minHeight: 'calc(100vh - 230px)',
          //top: '-120px'
          margin: 0,
          padding: 0,
        }}>
          {/* Center content */}
          <Box sx={{ 
            width: '100%',
            //flexGrow: 1,
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            zIndex: 5,
          }}>
            {/* Content goes here */}
            <TextField id="outlined-basic" placeholder='Input title...' variant= "outlined" fullWidth sx = {{
              backgroundColor: 'black',
              maxWidth: "60%",
              boxShadow: '0px 0px 5px 1px rgb(29, 29, 29)',
              input:{
                color: "rgb(201, 196, 196)",
                fontSize: "27px"
              },

              borderRadius: '100px',
              "& .MuiInputBase-root": {
                height: "85px", // Adjust height here
              },
              "& .MuiOutlinedInput-root": {
                borderRadius: "50px",
                "&:hover fieldset":{
                  borderColor: 'rgb(29, 29, 29)',
                },
                "&.Mui-focused fieldset": {
                    borderColor: 'rgb(29, 29, 29)', // Focused state
                  },
              }
            }} />
            {/* <TextField
              label="Search"
              variant="outlined"
              fullWidth
              sx={{
                maxWidth: 400,
                backgroundColor: "white",
                borderRadius: "25px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "25px",
                  "& fieldset": {
                    borderColor: "blue", // Normal border color
                  },
                  "&:hover fieldset": {
                    borderColor: "darkblue", // Hover state
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "green", // Focused state
                  },
                },
              }}
            /> */}
          
          {/* Deleted comments because this is the search/animation page
           Comments at the bottom
          <Box sx={{ 
            width: '100%',
            position: 'relative',
            height: '150px',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            borderTop: '1px solid #FF0000',
            zIndex: 10
          }}>
            <HorizontalInfiniteScrollComments />
          </Box> */}
        </Box>
        {/*ANIMATION BOXES*/}
        </Box>
            <Box sx = {{
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: 'fixed',
              display: 'flex', 
              flexDirection: {xs: "column", md: "row"}, 
              minHeight: '50vh',
              overflow: 'hidden',
              justifyContent: "center",
              alignItems: "center",
            }}>
             <Box sx = {{
              backgroundColor: 'gray',
              width: '600px',
              height: '400px',
              borderRadius: '10px',
              margin: "20px",
              padding: '10px',
             }}>
              {ScrollingStack(["This is a video title", 69696, 420, 0], "video")}
              </Box>
              <Box sx = {{
              backgroundColor: 'gray',
              width: '600px',
              height: '400px',
              borderRadius: '10px',
              margin: "20px",
              padding: '10px',
             }}>
              <TrieAnimation node={exampleTrie}/>
              </Box>
            </Box>
      </Box>
    </ThemeProvider>
  );
}

export default LandingPage;