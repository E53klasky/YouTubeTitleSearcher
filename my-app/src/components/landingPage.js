//Install Framer Motion for Animations: npm install framer-motion @mui/material @emotion/react @emotion/styled
import React, { useEffect, useMemo, useRef, useState } from 'react';
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
import { motion, useAnimation  } from "framer-motion";
import Divider, {dividerClasses} from '@mui/material/Divider'
import youtubeData from './visualsData';
import highlightWord from './visualsData';
import { input } from 'framer-motion/client';
import TrieAnimation from './TrieAnimation.js';
import SearchButton from './searchButton.js';
import {buildTrie} from './Trie.js';
import TreeContainer from './TrieAnimation.js';


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

export function ScrollingStack(inputArr, word) {
  let arr = youtubeData();

  //Highlights "word"
  const parts = inputArr[0].split(" ");
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
  inputArr[0] = [<p key="0">{before.join(" ")} <mark>{word}</mark> {after.join(" ")} </p>]


  arr[97] = inputArr;
  
  
  return (
    <Box sx={{ overflow: "hidden", height: "inherit", display: "flex", justifyContent: "center"}}>
      <motion.div
        animate={{ y: ["0%", "-1370%"]}} // Moves from bottom to top
        transition={{ duration: 4, repeat: 0, ease: "easeOut" }}
        style={{ width: "100%" }}
      >
        <Stack container spacing={1} sx = {{ width: "100%"}}>
          {arr.map((row, index) => (
            <>
            <Box
              sx={{
                width: "95.5%",
                height: 50,
                backgroundColor: "black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "1.2rem",
                borderRadius: 1,
                margin: "10px",
                paddingLeft: "10px", 
                paddingRight: "10px", 
                boxShadow: index == 97 && "0px 0px 4px 2px rgba(255, 217, 0, .4)",
                [`& .${dividerClasses.root}`]: {
                  mx: 1,
                }
              }}
            >
              {row[0]}
              <Divider color = "red" orientation='vertical' variant = "middle" flexItem/>
              {row[1]}
              <Divider color = "red" orientation='vertical' variant = "middle" flexItem/>
              {row[2]}
              <Divider color = "red" orientation='vertical' variant = "middle" flexItem/>
              {row[3]}
            </Box>
            
            </>
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
const MyComponent = ({word}) => {

  const coords = useMemo(() => {
    const arr = [];
    for (let i = 1; i < word.length; i++) {
      arr.push(word.charCodeAt(i) <= word.charCodeAt(i - 1));
    }
    return arr;
  }, [word]);

  const controls = useAnimation();

  useEffect(() => {
    async function runSequence() {
      // for each boolean, await the end of its animation…
      for (let goRight of coords) {
        await controls.start({
          x: goRight ? 100 : -100,
          transition: { duration: 0.5, ease: "easeInOut" },
        });
      }
    }
    runSequence();
  }, [coords, controls]);

  // return (
  //   <motion.div
  //     animate={controls}
  //     style={{
  //       width: 60,
  //       height: 60,
  //       background: "rebeccapurple",
  //       color: "#fff",
  //       display: "flex",
  //       alignItems: "center",
  //       justifyContent: "center",
  //       borderRadius: 8,
  //     }}
  //   >
  //     <MyComponent word= {word}/>
  //   </motion.div>
  // );
  return (
    <>
        <motion.div
          //key={index}
          // animate={{ y: left ? "-40px" : "20px", x: left ? "-40px" : "20px"}}
          animate={controls}
          transition={{delay: 2, duration: 1, ease: "easeIn" }}
          style={{ width: "100%" }}
        >
          <TrieAnimation node={buildTrie([word])} />
        </motion.div>
    </>
  );
};
// function SequencedMover({ directions /* array of bools */ }) {
//   const controls = useAnimation();

//   useEffect(() => {
//     async function runSequence() {
//       // for each boolean, await the end of its animation…
//       for (let goRight of directions) {
//         await controls.start({
//           x: goRight ? 100 : -100,
//           transition: { duration: 0.5, ease: "easeInOut" },
//         });
//       }
//     }
//     runSequence();
//   }, [directions, controls]);

//   return (
//     <motion.div
//       animate={controls}
//       style={{
//         width: 60,
//         height: 60,
//         background: "rebeccapurple",
//         color: "#fff",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         borderRadius: 8,
//       }}
//     >
//       <MyComponent word= {word}/>
//     </motion.div>
//   );
// }

function LandingPage() {
  let coords = useRef([false]);
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
            alignItems: 'center',
            mt: -8,
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
            flexDirection: 'column',
          }}>
            {/* Content goes here */}
            <TextField id="outlined-basic" placeholder='Input title...' variant= "outlined" fullWidth sx = {{
              backgroundColor: 'black',
              maxWidth: "60%",
              boxShadow: '0px 0px 5px 1px rgb(29, 29, 29)',
              input:{
                '&:-webkit-autofill': {
                    boxShadow: '0 0 0 1000px black inset',
                    WebkitTextFillColor: 'rgb(201, 196, 196)'},
                    borderRadius: '100px',
                    height: "50px", // Adjust height here
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
            <SearchButton/>
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
              zIndex: 1,
              overflow: "hidden",
             }}>
              <motion.div
                animate={{ y: ["0px", "0px"], scale: 1}} // Moves from bottom to top
                transition={{ duration: 1, repeat: 0, ease: "easeIn" }}
                style={{ width: "100%" }}
              >
              {/* {useEffect(() => {
                coords.current.map((left, index) => (
                  <motion.div
                    key={index}
                    animate={{ y: ["0px", left ? "600px" : "-600px"]}} // Moves from bottom to top
                    transition={{ duration: 1, repeat: 0, ease: "easeIn" }}
                    style={{ width: "100%" }}
                  >
                  
                      <TrieAnimation node={buildTrie(["words"])} coords={coords} />
                  </motion.div>
                ))}, [coords.current])} */}
                <MyComponent word= {"wordasdj"}/>
               </motion.div>
              
              </Box>
            </Box>
      </Box>
    </ThemeProvider>
  );
}

export default LandingPage;