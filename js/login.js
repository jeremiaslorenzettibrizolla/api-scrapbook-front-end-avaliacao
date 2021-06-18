function login(event) {
   event.preventDefault();

   const emailLogin = document.getElementById('current-email');
   const passwordLogin = document.getElementById('current-password');
   
   let storage = JSON.parse(localStorage.getItem('users'));
 
   if (storage == null) {
      alert('Usuário não cadastrado!');
      return;
   }
 
   for (let user of storage) {
      if (emailLogin.value === user.email && passwordLogin.value === user.password) {
         window.location.href = '/index.html';
         return;
      } else {
         alert('Email ou senha inválido');
         return;
      }
   }
}