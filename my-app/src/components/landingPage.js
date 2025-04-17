//Install Framer Motion for Animations: npm install framer-motion @mui/material @emotion/react @emotion/styled
import useYoutubeData from '../hooks/useYoutubeData.js';
import React, {  useRef, useState } from 'react';
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