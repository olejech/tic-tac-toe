import React, { useState, useEffect } from "react";
import Cell from "./cell";

import { useAppSelector, useAppDispatch } from './store/hooks';
import { move, restart } from './store/boardSlice';

const TicTacToe: React.FC = () => {
    const board = useAppSelector(state => state.myReducer.board);
    const nextTurn = useAppSelector(state => state.myReducer.nextTurn);
    const dispatch = useAppDispatch();

    const setMove = (flag: string, pos: number) => {
        dispatch({type: move.type, payload: {flag: flag, pos: pos}});
    }
    
    // const stream$ = new Observable(observer => {
    //     observer.next(board);
    // });
    // stream$.subscribe(
    //     (v) => console.log(v)
    // );

    // -------------- Эффекты -------------

    // Перезапуск игры
    useEffect(() => {
        //if(restart) {
            restartGame();
        //}
    }, []);

    // Ход бота
    useEffect(() => {
        if(!nextTurn && hasEmptyCells(board)) {
            let rand;
            do {
                rand = Math.round(random(0, 9));
            } while(board[rand] !== '');
            setMove("o", rand);
        }
    }, [nextTurn]);

    // -------------- Методы -------------

    // Вывод случайного числа
    const random = (min: number, max: number): number => {
        return min + (Math.random() * (max-min));
    }

    // Проверка, что на поле остались пустые клетки
    const hasEmptyCells = (array: string[]): boolean => {
        return !array.every(item => item !== '');
    }

    // Перезапуск игры
    const restartGame = () => {
        dispatch({type: restart.type});
    }

    // Обработка клика по клетке поля
    const handleCellClick = (id: number) => { 
        if(nextTurn && board[id] === '') {
            setMove("x", id);
        }
    }

    return(
        <div className="game">
            <p>{nextTurn ? "Вы ходите первым" : "Вы ходите вторым"}</p>
            <div className="field">
                {board.map((value, index) =>
                    <Cell 
                        key={index} 
                        onClick={() => handleCellClick(index)} 
                        value={value} 
                    />
                )}
            </div>
            <button className="button__restart" onClick={restartGame}>Начать заново</button>
            <span>{hasEmptyCells(board) ? '' : 'Игра окончена'}</span>
        </div>
    );
}

export default TicTacToe;