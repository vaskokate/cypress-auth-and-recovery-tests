import * as locators_main_page from "../locators/main_page.json";
import * as locators_result_page from "../locators/result_page.json";
import * as locators_recovery_password_page from "../locators/recovery_password_page.json";


/**
 * Функция для выполнения авторизации
 * @param {string} email - логин (email)
 * @param {string} password - пароль
 * @param {string} expectedText - текст, который ожидаем увидеть в сообщении (опционально)
 */
export function login(email, password, expectedText) {
    // 1. Вводим email в поле ввода
    cy.get(locators_main_page.email).type(email);

    // 2. Вводим пароль в поле ввода
    cy.get(locators_main_page.password).type(password);

    // 3. Нажимаем кнопку входа
    cy.get(locators_main_page.login_button).click();

    // 4. Проверяем текст в сообщении (если передан expectedText)
    if (expectedText) {
        cy.get(locators_result_page.title)
            .should('contain', expectedText)  // проще, чем .contains() + .should()
            .should('be.visible');
    }

    // Если expectedText не передан — пропускаем проверку текста

    // 5. Проверяем, что кнопка закрытия уведомления видна
    cy.get(locators_result_page.close).should('be.visible');
}


/**
 * Функция для восстановления пароля
 * @param {string} email - email для восстановления
 * @param {string} expectedMessage - ожидаемый текст сообщения
 */
export function recoverPassword(email, expectedMessage) {
    // 1. Нажимаем "Забыли пароль"
    cy.get(locators_main_page.fogot_pass_btn).click();

    // 2. Вводим email в форме восстановления
    cy.get(locators_recovery_password_page.email).type(email);

    // 3. Нажимаем кнопку отправки
    cy.get(locators_recovery_password_page.send_button).click();

    // 4. Проверяем сообщение (если передан expectedMessage)
    if (expectedMessage) {
        cy.get(locators_result_page.title)
            .should('contain', expectedMessage)
            .should('be.visible');
    }

    // 5. Проверяем видимость кнопки закрытия
    cy.get(locators_result_page.close).should('be.visible');
    cy.get(locators_result_page.close).click(); // Закрыть уведомление
}

/**
 * Тест базовых операций с полями ввода: ввод, удаление через Backspace, выделение и очистка
 * @param {string} loginText - текст для поля логина
 * @param {string} passwordText - текст для поля пароля
 */
export function testInputOperations(loginText, passwordText) {
    // 1. Ввод текста в оба поля
    cy.get(locators_main_page.email).type(loginText);
    cy.get(locators_main_page.password).type(passwordText);

    // 2. Удаление последних 5 символов через Backspace
    cy.get(locators_main_page.email).type('{backspace}{backspace}{backspace}{backspace}{backspace}');
    cy.get(locators_main_page.password).type('{backspace}{backspace}{backspace}{backspace}{backspace}');

    // 3. Выделение всего текста и удаление (Ctrl+A → Delete)
    cy.get(locators_main_page.email)
        .type('{selectall}{del}');
    cy.get(locators_main_page.password)
        .type('{selectall}{del}');
}