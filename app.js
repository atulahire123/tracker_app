document.addEventListener('DOMContentLoaded', function () {
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');
  
    expenseForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const expenseAmount = document.getElementById('expenseAmount').value;
      const expenseCategory = document.getElementById('expenseCategory').value;
      const expenseName = document.getElementById('expenseName').value;
  
      if (expenseAmount && expenseCategory && expenseName) {
        addExpense(expenseAmount, expenseCategory, expenseName);
        expenseForm.reset();
      } else {
        alert('Please fill in all fields.');
      }
    });
  
    function addExpense(amount, category, name) {
      const li = document.createElement('li');
      li.className = 'list-group-item';
      li.innerHTML = `
        <span>${amount}</span> - 
        <span>${category}</span> - 
        <span>${name}</span>
        <button class="btn btn-danger btn-sm float-right delete">Delete</button>
        <button class="btn btn-primary btn-sm float-right edit">Edit</button>
      `;
      expenseList.appendChild(li);
    }
  
    expenseList.addEventListener('click', function (e) {
      if (e.target.classList.contains('delete')) {
        e.target.parentElement.remove();
      } else if (e.target.classList.contains('edit')) {
        const li = e.target.parentElement;
        const expenseAmount = li.querySelector('span:nth-child(1)').textContent.trim();
        const expenseCategory = li.querySelector('span:nth-child(2)').textContent.trim();
        const expenseName = li.querySelector('span:nth-child(3)').textContent.trim();
  
        document.getElementById('expenseAmount').value = expenseAmount;
        document.getElementById('expenseCategory').value = expenseCategory;
        document.getElementById('expenseName').value = expenseName;
  
        li.remove();
      }
    });
  });