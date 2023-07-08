import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button, Alert } from 'react-native';
import generateSudoku from '../utils/generateSudoku';

const Sudoku = () => {
    let [new_board,maskedBoard] = generateSudoku();
    const [selectedCell, setSelectedCell] = useState(null);
    const [ans,setAns] = useState(new_board);
    const [iniboard, setIniBoard] = useState(maskedBoard);
    const [board, setBoard] = useState(maskedBoard);

    const handleCellPress = (row, col) => {
        setSelectedCell({ row, col });
    };

    const handleNumberPress = (number) => {
        if (selectedCell) {
            const { row, col } = selectedCell;
            const updatedBoard = JSON.parse(JSON.stringify(board));
            updatedBoard[row][col] = number;
            setBoard(updatedBoard);
        }
    };

    const handleNewPuzzle = () =>{
        [new_board,maskedBoard] = generateSudoku();
        setBoard(maskedBoard);
        setIniBoard(maskedBoard);
        setAns(new_board);
    };
    const handleRestart=()=>{
        setBoard(iniboard);
    };
    const handleSubmit=()=>{
        board===ans ? 
            Alert.alert('Congratulations !!!', 'You solved the puzzle. Try another puzzle ?', [
                {
                text: 'Cancel',
                onPress: () => {},
                style: 'cancel',
                },
                {text: 'OK', onPress:()=>{handleNewPuzzle()}},
            ]) : 
            Alert.alert('OOPS !!!', 'Seems like you have made some mistake. Try again !', [
                {text: 'OK', onPress: () => {}},
            ]);;
    };
    const handleSolve = () =>{
        setBoard(ans);
    };
    // const handleVerify = () =>{
    //     for (row=0; row<9 ;row++){
    //         for (col=0;col<9;col++){
    //             if (board[row][col]===""){
    //                 continue;
    //             }
    //             if (board[row][col]!==ans[row][col]){
    //                 console.log(`No ${row} ${col}`);
    //                 renderCell(row,col,board[row][col], true);
    //             }
    //         }
    //     }
    // }

    const renderCell = (row, col, value, isEditable) => {
        const cellStyle = [styles.cell, (isEditable) ? styles.lightCell : styles.darkCell,
            selectedCell?.row === row && selectedCell?.col === col && styles.selectedCell,
        ];

        return (
        <TouchableOpacity key={`${row}-${col}`} style={cellStyle} onPress={() => handleCellPress(row, col)} disabled={!isEditable}>
            <Text style={styles.cellText}>{value}</Text>
        </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.board}>
                {board.map((row, rowIndex) => (
                    <View key={rowIndex} style={styles.row}>
                        {row.map((cell, colIndex) => {
                            const isEditable = (iniboard[rowIndex][colIndex] === '');
                            return renderCell(rowIndex, colIndex, cell, isEditable);
                        })}
                    </View>
                ))}
            </View>
            <View style={styles.numberButtons}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
                <TouchableOpacity
                    key={number}
                    style={styles.numberButton}
                    onPress={() => handleNumberPress(number)}
                >
                    <Text style={styles.numberButtonText}>{number}</Text>
                </TouchableOpacity>
                ))}
            </View>
            <View style={[styles.buttonsBelow,{flexDirection:'column'}]}>
                <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:10}}>
                    <Button title='Restart' style={styles.buttons} onPress={handleRestart}/>
                    <Button title="New Puzzle" style={styles.buttons} onPress={handleNewPuzzle}/>
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Button title='Solve' style={styles.buttons} onPress={handleSolve}/>
                    <Button title='Submit' style={styles.buttons} onPress={handleSubmit}/>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    board: {
        flex:1,
        alignItems:'center',
        marginBottom: 20,
        justifyContent:'center',
    },
    row: {
        flexDirection: 'row',
    },
    cell: {
        width: 40,
        height: 40,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    lightCell: {
        backgroundColor: '#E9E9E9',
    },
    darkCell: {
        backgroundColor: '#4CAF50',
    },
    redCell:{
        backgroundColor: 'red',
    },
    selectedCell: {
        backgroundColor: 'yellow',
    },
    cellText: {
        fontSize: 20,
    },
    numberButtons: {
        flexDirection: 'row',
        marginHorizontal: 10,
    },
    numberButton: {
        flex: 1,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4CAF50',
        marginHorizontal: 5,
        borderRadius: 5,
        
    },
    numberButtonText: {
        color: 'white',
        fontSize: 18,
    },
    buttonsBelow:{
        margin:20,
        flexDirection:'row',
        justifyContent:'flex-end',
    },
    buttons: {
        margin:20,
    },
});

export default Sudoku;
