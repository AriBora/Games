import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';

const Sudoku = () => {
    const [selectedCell, setSelectedCell] = useState(null);
    const [board, setBoard] = useState([
        [5, 3, '', '', 7, '', '', '', ''],
        [6, '', '', 1, 9, 5, '', '', ''],
        ['', 9, 8, '', '', '', '', 6, ''],
        [8, '', '', '', 6, '', '', '', 3],
        [4, '', '', 8, '', 3, '', '', 1],
        [7, '', '', '', 2, '', '', '', 6],
        ['', 6, '', '', '', '', 2, 8, ''],
        ['', '', '', 4, 1, 9, '', '', 5],
        ['', '', '', '', 8, '', '', 7, 9],
    ]);

    const handleCellPress = (row, col) => {
        setSelectedCell({ row, col });
    };

    const handleNumberPress = (number) => {
        if (selectedCell) {
            const { row, col } = selectedCell;
            const updatedBoard = [...board];
            updatedBoard[row][col] = number;
            setBoard(updatedBoard);
        }
    };

    const renderCell = (row, col, value, isEditable) => {
        const cellStyle = [
            styles.cell,
            // (col + Math.floor(row / 3)) % 2 === 0 ? styles.lightCell : styles.darkCell,
            // selectedCell?.row === row && selectedCell?.col === col && styles.selectedCell,
            ((col+row) %2 == 0 ) ? styles.lightCell : styles.darkCell,
            selectedCell?.row === row && selectedCell?.col === col && styles.selectedCell,
        ];

        return (
        <TouchableOpacity
            key={`${row}-${col}`}
            style={cellStyle}
            onPress={() => handleCellPress(row, col)}
            disabled={!isEditable}
        >
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
                    const isEditable = cell === '';
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
            <View style={styles.buttonsBelow}>
                <Button title='Verify' style={styles.buttons}/>
                <Button title='Restart' style={styles.buttons}/>
                <Button title='Submit' style={styles.buttons}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    board: {
        marginBottom: 20,
        borderWidth:2,
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
