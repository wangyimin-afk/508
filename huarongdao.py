import random
import os

class HuarongDao:
    def __init__(self, size=4):
        self.size = size
        self.board = self._create_board()

    def _create_board(self):
        nums = list(range(1, self.size * self.size)) + [0]
        random.shuffle(nums)
        # Ensure solvable: adjust if necessary
        while not self._is_solvable(nums):
            random.shuffle(nums)
        return [nums[i:i+self.size] for i in range(0, len(nums), self.size)]

    def _is_solvable(self, nums):
        inv_count = 0
        for i in range(len(nums)):
            for j in range(i + 1, len(nums)):
                if nums[i] and nums[j] and nums[i] > nums[j]:
                    inv_count += 1
        if self.size % 2 == 1:
            return inv_count % 2 == 0
        else:
            row_from_bottom = self.size - (nums.index(0) // self.size)
            if row_from_bottom % 2 == 0:
                return inv_count % 2 == 1
            else:
                return inv_count % 2 == 0

    def display(self):
        os.system('clear')
        for row in self.board:
            print(' '.join(f'{n:2d}' if n != 0 else '  ' for n in row))

    def move(self, direction):
        # direction: 'w','a','s','d'
        x, y = next((i, j) for i in range(self.size) for j in range(self.size) if self.board[i][j] == 0)
        dx, dy = {'w':(-1,0), 's':(1,0), 'a':(0,-1), 'd':(0,1)}.get(direction, (0,0))
        nx, ny = x + dx, y + dy
        if 0 <= nx < self.size and 0 <= ny < self.size:
            self.board[x][y], self.board[nx][ny] = self.board[nx][ny], self.board[x][y]
            return True
        return False

    def is_complete(self):
        nums = sum(self.board, [])
        return nums == list(range(1, self.size * self.size)) + [0]


def main():
    game = HuarongDao()
    while not game.is_complete():
        game.display()
        move = input("Move (w/a/s/d): ")
        if move in ['w','a','s','d']:
            game.move(move)
    game.display()
    print('Congratulations! You solved the puzzle.')

if __name__ == '__main__':
    main()
