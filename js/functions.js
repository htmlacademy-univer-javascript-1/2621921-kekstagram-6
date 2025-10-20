// Функция для проверки длины строки
// Сравнивает количество символов в строке с заданным ограничением
function checkStringLength(string, maxLength) {
  // Возвращаем результат сравнения длины строки с максимальным значением
  return string.length <= maxLength;
}

// Функция для проверки строки на палиндром
// Палиндром - это строка, которая читается одинаково в обоих направлениях
function isPalindrome(string) {
  // Приводим строку к нижнему регистру и удаляем все пробелы
  const cleanString = string.toLowerCase().replaceAll(' ', '');
  // Разбиваем строку на массив символов, переворачиваем и собираем обратно
  const reversedString = cleanString.split('').reverse().join('');
  // Сравниваем очищенную строку с перевернутой версией
  return cleanString === reversedString;
}

// Функция для извлечения чисел из текстовой строки
// Находит все цифры и объединяет их в одно целое число
function extractNumber(string) {
  // Преобразуем входные данные в строковый формат для обработки
  const textString = String(string);
  // Удаляем все символы, которые не являются цифрами
  const numberString = textString.replace(/\D/g, '');
  // Если найдены цифры, преобразуем в число, иначе возвращаем NaN
  return numberString ? parseInt(numberString, 10) : NaN;
}

// Проверка работы функции проверки длины строки
console.log('Тест длины строки:');
console.log('Короткая строка:', checkStringLength('пример текста', 15));
console.log('Длинная строка:', checkStringLength('очень длинный пример текста', 10));

// Проверка работы функции палиндрома
console.log('Тест палиндромов:');
console.log('Простой палиндром:', isPalindrome('топот'));
console.log('Палиндром с пробелами:', isPalindrome('а роза упала на лапу азора'));
console.log('Не палиндром:', isPalindrome('простая строка'));

// Проверка работы функции извлечения чисел
console.log('Тест извлечения чисел:');
console.log('Текст с числами:', extractNumber('заказ номер 12345'));
console.log('Текст без чисел:', extractNumber('текст без цифр'));
console.log('С дробным числом:', extractNumber('цена 99.99 рублей'));
