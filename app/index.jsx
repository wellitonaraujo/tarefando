import AddButton from "@/components/AddButton";
import CustomModal from "@/components/CustomModal";
import HeaderCard from "@/components/HeaderCard";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView, Swipeable, ScrollView } from 'react-native-gesture-handler';

const App = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [tasks, setTasks] = useState([]);


 const [editingTask, setEditingTask] = useState(null); 

    const openModal = () => {
        setModalVisible(true);
        setEditingTask(null); 
    };

    const closeModal = () => {
        setModalVisible(false);
        setEditingTask(null); 
    };

    const handleEditTask = (id) => {
        const taskToEdit = tasks.find(task => task.id === id);
        if (taskToEdit) {
            setEditingTask(taskToEdit);
            setModalVisible(true); 
        }
    };

    const handleSaveTask = (taskName) => {
        if (editingTask) {
            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task.id === editingTask.id ? { ...task, name: taskName } : task
                )
            );
            closeModal();
        } else {
            if (taskName) {
                setTasks([...tasks, { id: Date.now().toString(), name: taskName, completed: false }]);
            }
        }
    };

    const handleCompleteTask = (id) => {
        setTasks((prevTasks) => {
            const updatedTasks = prevTasks.map(task => 
                task.id === id ? { ...task, completed: true } : task
            );
            return updatedTasks;
        });
    };

    const handleDeleteTask = (id) => {
        setTasks((prevTasks) => {
            const updatedTasks = prevTasks.filter(task => task.id !== id);
            return updatedTasks;
        });
    };

    const renderRightActions = (id, completed) => (
        <View style={styles.rightActionsContainer}>
            {completed ? (
                <TouchableOpacity
                    style={[styles.actionButton, styles.deleteButton]}
                    onPress={() => handleDeleteTask(id)}
                >
                    <Text style={styles.actionText}>Deletar</Text>
                </TouchableOpacity>
            ) : (
                <>
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
                </>
            )}
        </View>
    );

    return (
        <GestureHandlerRootView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>Painel de tarefas</Text>
                <HeaderCard totalTasks={tasks.length} completedTasks={tasks.filter(task => task.completed).length} />
            </View>

            {/* Verifica se há tarefas */}
            {tasks.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyTitle}>
                        Você não possui tarefas <Text style={styles.highlightedText}>hoje</Text>
                    </Text>
                    <Text style={styles.emptyDescription}>Clique no botão (+) para criar</Text>
                </View>
            ) : (
                <ScrollView contentContainerStyle={styles.listContainer}>
                    {/* Lista de Tarefas Não Concluídas */}
                    {tasks.filter(task => !task.completed).map(task => (
                        <Swipeable key={task.id} renderRightActions={() => renderRightActions(task.id, task.completed)}>
                            <View style={styles.taskItem}>
                                <Text style={styles.taskText}>{task.name}</Text>
                            </View>
                        </Swipeable>
                    ))}

                    {/* Seção para tarefas concluídas */}
                    {tasks.some(task => task.completed) && (
                        <View style={styles.completedSection}>
                            <Text style={styles.completedTitle}>Concluídas</Text>
                            {tasks.filter(task => task.completed).map(task => (
                                <Swipeable key={task.id} renderRightActions={() => renderRightActions(task.id, task.completed)}>
                                    <View style={[styles.taskItem, { opacity: 0.5 }]}>
                                        <Text style={styles.taskText}>{task.name}</Text>
                                    </View>
                                </Swipeable>
                            ))}
                        </View>
                    )}
                </ScrollView>
            )}

            <CustomModal
                visible={modalVisible}
                onClose={closeModal}
                onSave={handleSaveTask}
                taskName={editingTask ? editingTask.name : ''} 
                isEditing={!!editingTask} 
            />
            <AddButton onPress={openModal} />
        </GestureHandlerRootView>
    );
};

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#181A20',
        paddingBottom: 16,
    },
    headerContainer: {
        padding: 16,
    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '600',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    emptyTitle: {
        color: '#FFFFFF',
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 8
    },

    highlightedText: {
        color: '#1A72F3',
        fontWeight: 'bold',
    },
    emptyDescription: {
        color: '#FFFFFF',
        fontSize: 13,
        textAlign: 'center',
    },
    completedSection: {
        marginTop: 16,
    },
    completedTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        marginHorizontal: 16,
    },
    taskList: {
        width: '100%',
    },
    listContainer: {
        paddingBottom: 16,
    },
    taskItem: {
        backgroundColor: '#313747',
        padding: 15,
        borderRadius: 16,
        marginVertical: 4,
        marginHorizontal: 16,
    },
    taskText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 1.5,
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
        margin: 5,
    },
    completeButton: {
        backgroundColor: '#4CAF50',
        height: 40,
        borderRadius: 12,
    },
    editButton: {
        backgroundColor: '#FFA500',
        height: 40,
        borderRadius: 12,
    },
    deleteButton: {
        backgroundColor: '#FF0000',
        height: 40,
        borderRadius: 12,
    },
    actionText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '500',
    },
});
