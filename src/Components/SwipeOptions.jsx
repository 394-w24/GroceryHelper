import React, {
  useState,
  ReactNode,
  CSSProperties,
  useId,
  useEffect,
} from "react";
import { useSwipeable } from "react-swipeable";
import { Box, Button } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Food from "./Food";
import DeleteConfirmationModal from "./DeleteConfimationModal";
import EditModal from "./EditModal";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase";

const SwipeOptions = ({
  fooditem,
  height = "100px",
  handleDeleteFood,
  rerender,
}) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [foodInfo, setfoodInfo] = useState({});
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    const init = () => {
      setfoodInfo(fooditem);
    };

    init();
  }, [rerender]);

  const handlers = useSwipeable({
    onSwiped: () => handlePanEnd(),
    onSwipeStart: (eventData) => handlePanStart(eventData),
    onSwiping: (eventData) => handleSwipe(eventData),
    trackMouse: true,
  });

  const handlePanStart = (e) => {
    if (e.dir === "Down" || e.dir === "Up") {
      setIsScrolling(true);
    }
  };

  const handlePanEnd = () => {
    setIsScrolling(false);
  };

  const handleSwipe = (e) => {
    if (!isScrolling) {
      if (e.dir === "Left" && !isExpanded) {
        setIsExpanded(true);
      } else if (e.dir === "Right" && isExpanded) {
        setIsExpanded(false);
      }
    }
  };

  const handleEditSave = (newValue) => {
    if (newValue === 0) {
      setDeleteModalOpen(true);
    } else {
      setfoodInfo((prev) => ({
        ...prev,
        quantity: newValue,
      }));
      setEditModalOpen(false);
      setIsExpanded(false);
      const docRef = doc(db, "userGroceries", foodInfo.id);
      updateDoc(docRef, {
        quantity: newValue,
      });
    }
  };

  const handleDeleteConfirm = () => {
    setDeleteModalOpen(false);
    setIsExpanded(false);
    handleDeleteFood(foodInfo.id);
  };

  return (
    <Box
      sx={{
        height: height,
        width: "100%",
        position: "relative",
        overflow: "hidden",
        display: "inline-flex",
        boxSizing: "border-box",
      }}
    >
      <Box {...handlers}>
        <Box
          sx={{
            height,
            transform: `translateX(${isExpanded ? `-124px` : "0px"})`,
            width: "100%",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "absolute",
            top: 0,
            left: 0,
            transition: "all 0.25s ease",
            boxSizing: "border-box",
            paddingTop: "1rem",
            paddingBottom: "0.8rem",
            zIndex: 2,
          }}
        >
          <Food key={foodInfo.id} fooditem={foodInfo} />

          {/* <Button
						onClick={() => {
							const shouldClose = isExpanded;
							setIsExpanded(!shouldClose);
							if (shouldClose && onClose) {
								onClose();
							} else if (!shouldClose && onOpen) {
								onOpen();
							}
						}}
						sx={{
							height: height,
							minWidth: "50px",
							appearance: "none",
							border: "none",
							boxSizing: "border-box",
							color: "inherit",
							background: "transparent",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							textAlign: "center",
							cursor: "pointer",
						}}
						aria-label='Click to reveal actions'
						aria-controls={id}
						aria-expanded={isExpanded ? "true" : "false"}
					>
						<MoreHorizIcon />
					</Button> */}
        </Box>
        <Box
          sx={{
            height: height,
            display: isExpanded ? "flex" : "none",
            width: "100%",
            position: "absolute",
            top: 0,
            right: 0,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            zIndex: 1,
          }}
        >
          <Button
            onClick={() => setEditModalOpen(true)}
            sx={{ height: height, borderRadius: 3 }}
          >
            <EditOutlinedIcon />
          </Button>
          <Button
            onClick={() => setDeleteModalOpen(true)}
            sx={{ height: height, borderRadius: 3, marginLeft: "2px" }}
          >
            <DeleteOutlineIcon />
          </Button>
          <EditModal
            open={isEditModalOpen}
            onClose={() => setEditModalOpen(false)}
            onSave={handleEditSave}
            initialValue={foodInfo.quantity}
          />
          <DeleteConfirmationModal
            open={isDeleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            onConfirm={handleDeleteConfirm}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SwipeOptions;
