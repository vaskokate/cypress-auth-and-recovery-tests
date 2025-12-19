import * as data from "../helpers/default_data.json";
import * as locators_main_page from "../locators/main_page.json";
import * as locators_recovery_password_page from "../locators/recovery_password_page.json";
import * as locators_result_page from "../locators/result_page.json";
import { login, recoverPassword, testInputOperations } from "../utils/auth.js";

describe('Проверка авторизации', function () {

    beforeEach('Начало теста', function () {
        cy.visit('/');

        cy.get(locators_main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)');
    });


    afterEach('После теста', function () {
        cy.clearCookies(); // Очистка после каждого теста (удаляем куки)
        cy.clearLocalStorage();  // Очистка после каждого теста (очищаем LocalStorage)

    });

    it('Проверка работы полей ввода: возможность ввода и удаления текста', function () {
        testInputOperations(
            'вкуснаяхрустящаяфранцузскаябулка',
            'рандомныйпарольдляпроверки'
        );
    });

    it('Правильный логин и правильный логин', function () {
        // Вызываем нашу функцию с данными из файла utils/auth.js
        login(data.login, data.password, 'Авторизация прошла успешно');
    });

    it('Правильный логин и неправильный пароль', function () {
        // Вызываем нашу функцию с данными из файла utils/auth.js
        login(data.login, 'qa_one_love7', 'Такого логина или пароля нет');
    });

    it('Неправильный логин и правильный пароль', function () {
        // Вызываем нашу функцию с данными из файла utils/auth.js
        login('german@dolnikoF.ru', data.password, 'Такого логина или пароля нет');
    });

    it('Логин без @ и правильный пароль', function () {
        // Вызываем нашу функцию с данными из файла utils/auth.js
        login('germandolnikov.ru', data.password, 'Нужно исправить проблему валидации');
    });

    it('Восстановление пароля: успешный запрос', function () {
        // Вызываем новую функцию с данными из файла utils/auth.js
        recoverPassword('vaskokate17@gmail.com', 'Успешно отправили пароль на e-mail');
    });

    it('Приведение к строчным буквам в логине', function () {
        // Вызываем нашу функцию с данными из файла utils/auth.js
        login('GerMan@Dolnikov.ru', data.password, 'Авторизация прошла успешно');
    });

})

// Запускать Сайпресс можно командой: npx cypress open
// Если нужно запустить прогон автотестов из терминала, то вот команда: npx cypress run

