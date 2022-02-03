import React, {useState, useMemo} from 'react';
import CardsSelect from './UI/CardsSelect';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { columnsItem } from '../utils/columnsItem';
import MyModal from './UI/MyModal'; 
import UserItem from './UserItem.jsx';
import PostService from '../API/PostService';
import {onDragEnd} from '../utils/dragAndDrop';


const CardsTable = () => {
    const [users, setUsers] = useState([]);
    const [columns, setColumns] = useState(columnsItem);
    const [selectedSort, setSelectedSort] = useState('');
    const [itemIndex, setItemIndex] = useState();
    const [basicModal, setBasicModal] = useState('');

     function handleClick (item) {
        setItemIndex(item.id);
        setBasicModal(!basicModal);
     }

    useMemo(() => {
         const getResponse = PostService.getAllusers( function(response) {
             setUsers(response.data);
             
         });
         return getResponse;
         },[]);
        
        columnsItem[1].items = users;
        
        const sortUser = (sort) => {

            if(sort === 'city') {
               setSelectedSort(sort);
               setUsers(columns[1].items = [...columns[1].items].sort((a, b) => a['address'][sort].localeCompare(b['address'][sort])));
            } else {
                setSelectedSort(sort);
                setUsers(columns[1].items =[...columns[1].items].sort((a, b) => a[sort].localeCompare(b[sort])));
            }
        
        };

    return (
        <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
             <CardsSelect
                value={selectedSort}
                defaultValue={"Sort"}
                onChange={sortUser}
                options={[
                  { value: "name", name: "Sort by name" }, 
                  { value: "email", name: "Sort by email" },
                  { value: "city", name: "Sort by city" },
                  { value: "website", name: "Sort by website" }
               ]}/>
        <DragDropContext
          onDragEnd={result => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}
                key={columnId}
              >
                <h2>{column.name}</h2>
                <div style={{ margin: 8 }}>
                  <Droppable droppableId={columnId} key={columnId + index}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? "lightblue"
                              : "lightgrey",
                            padding: 4,
                            width: 250,
                            minHeight: 500
                          }}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id.toString()}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      data-mdb-toggle='modal' 
                                      data-mdb-target="#ModalUser"
                                    
                                      onClick={() => handleClick(item)}
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: "none",
                                        padding: 16,
                                        margin: "0 0 8px 0",
                                        minHeight: "50px",
                                        backgroundColor: snapshot.isDragging
                                          ? "#263B4A"
                                          : "#456C86",
                                        color: "white",
                                        ...provided.draggableProps.style
                                      }}
                                    >
                                      User: {item.name} 
                                      <div>Email: {item.email}</div>   
                                      <div> City: {item.address.city}</div>
                                      <div>Website: {item.website}</div>
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
                <MyModal
                  active="ModalUser"
                  title={"Post Items"} >
                  {<UserItem value={itemIndex}/>}
                </MyModal>                        
              </div>
            );
          })}
        </DragDropContext>
      </div>
    );

};

export default CardsTable;