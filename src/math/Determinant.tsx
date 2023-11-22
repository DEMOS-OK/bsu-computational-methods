export default function det(matrix: number[][]): number {
    const n = matrix.length;

    // Если матрица 1x1, возвращаем единственный элемент
    if (n === 1) {
        return matrix[0][0];
    }

    let determinant = 0;

    // Рекурсивно вычисляем определитель
    for (let i = 0; i < n; i++) {
        // Вычисляем минор
        const minor = [];
        for (let j = 1; j < n; j++) {
            minor.push(matrix[j].filter((_, index) => index !== i));
        }

        // Рекурсивно вызываем функцию для вычисления определителя минора
        const minorDeterminant = det(minor);

        // Вычисляем алгебраическое дополнение и добавляем к определителю
        determinant += matrix[0][i] * Math.pow(-1, i) * minorDeterminant;
    }

    return determinant;
}
