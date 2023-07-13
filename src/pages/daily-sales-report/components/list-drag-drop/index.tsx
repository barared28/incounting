import StrictModeDroppable from "@/components/drag-drop/drop";
import { Alert, Box, Flex, Text } from "@mantine/core";
import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";
import Card from "./card";

interface IListDragDropProps {
  list: any;
  handleChange: (val: DropResult) => void;
}

const ListDragDrop = (props: IListDragDropProps) => {
  const { list, handleChange } = props;
  if (list?.length <= 1) return null;

  return (
    <>
      <Box>
        <Text weight={500} size="sm" mb="sm">
          Filter List Order
        </Text>
        <DragDropContext onDragEnd={(val: DropResult) => handleChange(val)}>
          <StrictModeDroppable droppableId="1">
            {(provided) => (
              <Flex
                direction="column"
                gap="md"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {list.map((item: any, index: number) => (
                  <Draggable
                    key={item.key}
                    draggableId={item.key}
                    index={index}
                  >
                    {(providedDrag) => (
                      <div
                        {...providedDrag.draggableProps}
                        {...providedDrag.dragHandleProps}
                        ref={providedDrag.innerRef}
                      >
                        <Card title={item.title} icon={item.icon} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Flex>
            )}
          </StrictModeDroppable>
        </DragDropContext>
      </Box>
      <Alert color="yellow" variant="outline">
        You can change the filter order by drag the menu
      </Alert>
    </>
  );
};

export default ListDragDrop;
