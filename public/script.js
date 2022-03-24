//
//
// function SendForm(){
//
//     var name = document.getElementById('name').value
//     var telephone = document.getElementById('telephone').value
//     var email = document.getElementById('email').value
//     var gender = document.getElementById('gender').value
//     var birthDate = document.getElementById('birthDate').value
//     var periofLife = document.getElementById('periofLife').value
//     var profession = document.getElementById('profession').value
//     var sphere = document.getElementById('sphere').value
//     var periodWork = document.getElementById('periodWork').value
//     var bankAccount = document.getElementById('bankAccount')
//
//     if(document.getElementById("name").checkValidity() === false) {
//         alert('Фамилия и Имя не заполнены и не должны содержать цифр и латинские буквы')
//         document.getElementById('name').focus();
//     }else{
//         if (bankAccount.checked) {
//             bankAccount.value = 'счет есть';
//         }else {
//             bankAccount.value = 'счета нет'
//         }
//         if (realEstate.checked) {
//             realEstate.value = 'недвижимоть есть';
//         }else {
//             realEstate.value = 'недвижимости нет'
//         }
//         if (insurencePolice.checked) {
//             insurencePolice.value = 'страховка есть';
//         }else {
//             insurencePolice.value = 'страховки нет'
//         }
//         if (telephone === ''){
//             alert(`Введите телефон`)
//             document.getElementById('telephone').focus();
//         }else if (email === ''){
//             alert(`Введите почту`)
//             document.getElementById('email').focus();
//         }else if (birthDate === ''){
//             alert(`Введите дату рождения`)
//             document.getElementById('birthDate').focus();
//         }else if (periodWork === ''){
//             alert(`Введите период работы`)
//             document.getElementById('periodWork').focus();
//         }
//     }
// }