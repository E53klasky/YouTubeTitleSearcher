// import {
//   Box,
//   Stack,
// } from '@mui/material';
// import { motion } from "framer-motion";
// export function TrieAnimation() {

//   return (
//     <Box sx={{ overflow: "hidden", height: "inherit", display: "flex", justifyContent: "center" }}>
//       <motion.div
//         animate={{ width: ["inherit", "0%"], height: ["inherit", "0%"] }}
//         transition={{ duration: 4, repeat: 0, ease: "circIn" }}
//         style={{ width: "200px", height: "200px" }}
//       >
//         <Box
//           sx={{
//             width: "100%",
//             height: '100%',
//             backgroundColor: "white",
//             // display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             color: "white",
//             fontSize: "1.2rem",
//             borderRadius: '50%',
//             // margin: "10px",
//             // paddingLeft: "10px", 
//             // paddingRight: "10px", 
//           }}
//         >

//         </Box>

//       </motion.div>
//     </Box>git
//   );
// }
import React from "react";
import { Box, Paper } from "@mui/material";

const NODE_WIDTH = 40;
const NODE_HEIGHT = 40;
const HORIZONTAL_SPACING = 40;
const VERTICAL_SPACING = 40;

const LineBetweenPoints = ({ x1, y1, x2, y2, color = "black", width = 2 }) => {
  return (
    <Box
      position="absolute"
      top={0}
      left={-100}
      width="1000%"
      height="1000%"
      pointerEvents="none"
    >
      <svg width="100%" height="100%" style={{ position: "absolute", top: 0, left: 0 }}>
        <line
          x1={x1+100}
          y1={y1}
          x2={x2+100}
          y2={y2}
          stroke={color}
          strokeWidth={width}
        />
      </svg>
    </Box>
  );
};

const TrieAnimation = ({ node, depth = 0, index = 0, totalSiblings = 1}) => {
  if (!node) return null;

  const childrenKeys = Object.keys(node.children || {});
  const childCount = childrenKeys.length;
  const left = childrenKeys.at(0) > node.char;

  return (
    <Box
      position="relative"
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{ minWidth: NODE_WIDTH }}
    >
      <Box sx={{ position: "relative" }}>
        {/* Node Circle */}
        <Paper
          elevation={3}
          sx={{
            width: NODE_WIDTH,
            height: NODE_HEIGHT,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
            backgroundColor: node.isEnd ? "#1976d2" : "#90caf9",
            color: "white",
            zIndex: 1,
          }}
        >
          {childrenKeys.at(0)}
        </Paper>

        {/* Connectors to children */}
        {/*childCount == 2 && (
          <>
           <Box
            sx={{
              position: "absolute",
              top: NODE_HEIGHT,
              left: NODE_WIDTH / 2,
              height: VERTICAL_SPACING,
              width: 2,
              backgroundColor: "#999",
              transform: "translateX(-1px)",
              zIndex: 0,
            }}
          /> 
          <LineBetweenPoints x1={NODE_WIDTH/2} y1={NODE_HEIGHT} x2={-NODE_WIDTH/4} y2={VERTICAL_SPACING*1.5} color="red" width={10}/>
          <LineBetweenPoints x1={NODE_WIDTH/2} y1={NODE_HEIGHT} x2={NODE_WIDTH*5/4} y2={VERTICAL_SPACING*1.5} color="red" width={10}/>
          </>
        )*/}
        {childCount == 1 && left && (
          <LineBetweenPoints x1={NODE_WIDTH/2} y1={NODE_HEIGHT} x2={NODE_WIDTH*3/2} y2={VERTICAL_SPACING*1.5} color="red" width={10}/>
        )}
        {childCount == 1 && !left && (
          <LineBetweenPoints x1={NODE_WIDTH/2} y1={NODE_HEIGHT} x2={-NODE_WIDTH/2} y2={VERTICAL_SPACING*1.5} color="red" width={10}/>
        )}
      </Box>

      {/* Render children horizontally */}
      <Box
        mt={`${VERTICAL_SPACING}px`}
        display="flex"
        justifyContent="center"
        marginLeft={left ? 10 : -10}
        gap={`${HORIZONTAL_SPACING}px`}
      >
        {childrenKeys.map((key, i) => (
          <TrieAnimation
            key={key}
            node={node.children[key]}
            depth={depth + 1}
            index={i}
            totalSiblings={childCount}
          />
        ))}
      </Box>
    </Box>
  );
};

export default TrieAnimation;