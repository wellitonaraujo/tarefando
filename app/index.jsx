import AddButton from "@/components/AddButton"
import CustomModal from "@/components/CustomModal"
import HeaderCard from "@/components/HeaderCard"
import { useState } from "react"
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';

const App = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [tasks, setTasks] = useState([]);
  
    const [completedTasks, setCompletedTasks] = useState(0);
  
    const openModal = () => {
      setModalVisible(true);
    };
  
    const closeModal = () => {
      setModalVisible(false);
    };
  
    const handleSaveTask = (taskName) => {
      if (taskName) {
        setTasks([...tasks, { id: Date.now().toString(), name: taskName, completed: false }]);
      }
    };

    const handleCompleteTask = (id) => {
        setTasks((prevTasks) => {
            const updatedTasks = prevTasks.map(task => 
                task.id === id ? { ...task, completed: true } : task
            );
            setCompletedTasks(updatedTasks.filter(task => task.completed).length);
            return updatedTasks;
        });
        Alert.alert("Concluir", "Tarefa marcada como concluída!");
    };
    
    const handleDeleteTask = (id) => {
        setTasks((prevTasks) => {
            const updatedTasks = prevTasks.filter(task => task.id !== id);
            setCompletedTasks(updatedTasks.filter(task => task.completed).length);
            return updatedTasks;
        });
    };

    const renderRightActions = (id) => (
        <View style={styles.rightActionsContainer}>
          <TouchableOpacity
            style={[styles.actionButton, styles.completeButton]}
            onPress={() => handleCompleteTask(id)}
          >
            <Text style={styles.actionText}>Concluir</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.editButton]}
            onPress={() => handleEditTask(id)}
          >
            <Text style={styles.actionText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            onPress={() => handleDeleteTask(id)}
          >
            <Text style={styles.actionText}>Deletar</Text>
          </TouchableOpacity>
        </View>
    );

    return(
        <GestureHandlerRootView style={styles.container}>
           <View style={styles.test}>
            <Text style={styles.title}>Painel de tarefas</Text>
            <HeaderCard totalTasks={tasks.length} completedTasks={completedTasks} />
           </View>

            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Swipeable renderRightActions={() => renderRightActions(item.id)}>
                        <View style={styles.taskItem}>
                            <Text style={styles.taskText}>{item.name}</Text>
                        </View>
                    </Swipeable>
                )}
                style={styles.taskList}
            />
            <CustomModal
                visible={modalVisible}
                onClose={closeModal}
                onSave={handleSaveTask}
            />
        <AddButton onPress={openModal}/>
        </GestureHandlerRootView>
    )
}

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#181A20',
    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '600'

    },
    taskList: {
        width: '100%',
        marginTop: 30,
      },
    test: {
        padding: 16
   },
      
      taskItem: {
        backgroundColor: '#313747',
        padding: 15,
        borderRadius: 16,
        margin: 8,
        marginHorizontal: 16
      },
      taskText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 1.5
      },
      rightActionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
      },
      actionButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 75,
        height: '100%',
        margin: 5
      },
      completeButton: {
        backgroundColor: '#4CAF50',
        height: 40,
        borderRadius: 12
      },
      editButton: {
        backgroundColor: '#FFA500',
        height: 40,
        borderRadius: 12
      },
      deleteButton: {
        backgroundColor: '#FF0000',
        height: 40,
        borderRadius: 12
      },
      actionText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '500',
      },
})