document.addEventListener('DOMContentLoaded', function () {
  const expenseForm = document.getElementById('expense-form');
  const expenseList = document.getElementById('expense-list');

  expenseForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const expenseName = document.getElementById('expenseName').value;
    const expenseAmount = document.getElementById('expenseAmount').value;
    const expenseCategory = document.getElementById('expenseCategory').value;

    if (expenseName && expenseAmount && expenseCategory) {
      addExpense(expenseName, expenseAmount, expenseCategory);
      expenseForm.reset();
    } else {
      alert('Please fill in all fields.');
    }
  });

  function addExpense(name, amount, category) {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.innerHTML = `
      <strong>${name}</strong>: $${amount} (${category})
      <button class="btn btn-danger btn-sm float-right delete">Delete</button>
      <button class="btn btn-primary btn-sm float-right edit">Edit</button>
    `;
    expenseList.appendChild(li);

    updateLocalStorage();
  }

  expenseList.addEventListener('click', function (e) {
    if (e.target.classList.contains('delete')) {
      e.target.parentElement.remove();
      updateLocalStorage();
    } else if (e.target.classList.contains('edit')) {
      const li = e.target.parentElement;
      const expenseName = li.querySelector('strong').textContent;
      const expenseAmount = li.querySelector('strong').nextSibling.textContent.split(':')[1].split('(')[0].trim();
      const expenseCategory = li.querySelector('strong').nextSibling.textContent.split('(')[1].split(')')[0].trim();

      document.getElementById('expenseName').value = expenseName;
      document.getElementById('expenseAmount').value = expenseAmount;
      document.getElementById('expenseCategory').value = expenseCategory;

      li.remove();
      updateLocalStorage();
    }
  });

  function updateLocalStorage() {
    const expenses = [];
    document.querySelectorAll('li').forEach(function (expense) {
      const expenseDetails = expense.querySelector('strong').textContent.split(':');
      const name = expenseDetails[0].trim();
      const amount = expenseDetails[1].split('(')[0].trim().slice(1);
      const category = expenseDetails[1].split('(')[1].split(')')[0].trim();

      expenses.push({
        name: name,
        amount: amount,
        category: category
      });
    });
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }

  function populateExpenseList() {
    const expenses = JSON.parse(localStorage.getItem('expenses'));
    if (expenses) {
      expenses.forEach(function (expense) {
        addExpense(expense.name, expense.amount, expense.category);
      });
    }
  }

  populateExpenseList();
});
