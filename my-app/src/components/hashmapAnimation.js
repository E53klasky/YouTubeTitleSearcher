import { motion } from "framer-motion";
import Divider, {dividerClasses} from '@mui/material/Divider'
import youtubeData from './visualsData';
import highlightWord from './visualsData';

export function ScrollingStack(inputArr, word) {
    let arr = youtubeData();
  
    //Highlights "word"
    inputArr[0] = highlightWord(inputArr, word)
  
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