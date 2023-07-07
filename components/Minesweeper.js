import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Minesweeper = () => {
//   const [board, setBoard] = useState([
//     [5, 3, '', '', 7, '', '', '', ''],
//     [6, '', '', 1, 9, 5, '', '', ''],
//     ['', 9, 8, '', '', '', '', 6, ''],
//     [8, '', '', '', 6, '', '', '', 3],
//     [4, '', '', 8, '', 3, '', '', 1],
//     [7, '', '', '', 2, '', '', '', 6],
//     ['', 6, '', '', '', '', 2, 8, ''],
//     ['', '', '', 4, 1, 9, '', '', 5],
//     ['', '', '', '', 8, '', '', 7, 9],
// ]);
    const [board, setBoard] = useState([]);
    const [timer, setTimer] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        generateBoard();
        startTimer();
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (gameOver) {
        clearInterval(interval);
        }
    }, [gameOver]);

    const generateBoard = () => {
        const newBoard = Array(9).fill().map(() => Array(9).fill({ value: '', revealed: false, mine: false }));

        // Place mines randomly
        for (let i = 0; i < 10; i++) {
        const randomRow = Math.floor(Math.random() * 9);
        const randomCol = Math.floor(Math.random() * 9);
        newBoard[randomRow][randomCol].mine = true;
        }

        setBoard(newBoard);
    };

    const startTimer = () => {
        const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
        }, 1000);
    };

    const handleCellPress = (row, col) => {
        if (gameOver) return;

        const cell = board[row][col];

        if (cell.revealed) return;

        const updatedBoard = [...board];
        updatedBoard[row][col].revealed = true;

        if (cell.mine) {
        setGameOver(true);
        // Handle game over logic here
        }

        setBoard(updatedBoard);
    };

    const renderCell = (row, col, value, revealed) => {
        const cellStyle = [
        styles.cell,
        revealed ? styles.revealedCell : styles.hiddenCell,
        ];

        return (
        <TouchableOpacity
            key={`${row}-${col}`}
            style={cellStyle}
            onPress={() => handleCellPress(row, col)}
        >
            {revealed && <Text style={styles.cellText}>{value}</Text>}
        </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
        <Text style={styles.timer}>Timer: {timer}</Text>
        <View style={styles.board}>
            {board.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
                {row.map((cell, colIndex) => (
                renderCell(rowIndex, colIndex, cell.value, cell.revealed)
                ))}
            </View>
            ))}
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
    timer: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    board: {
        marginBottom: 20,
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
        backgroundColor: '#D3D3D3',
    },
    hiddenCell: {
        backgroundColor: '#D3D3D3',
    },
    revealedCell: {
        backgroundColor: '#E9E9E9',
    },
    cellText: {
        fontSize: 20,
    },
});

export default Minesweeper;
