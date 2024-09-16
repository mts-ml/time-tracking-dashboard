const periods = document.querySelectorAll('.period > p')

// Função para atualizar os dados com base no período selecionado
function updateData(period) {
   fetch('data.json')
      .then(response => response.json())
      .then(data => {
         data.forEach(item => {

            // Seleciona a seção pelo ID correspondente ao título em minúsculas e sem espaços
            const section = document.querySelector(`#${item.title.toLowerCase().replace(' ', '-')}`)

            if (section) {
               const h2 = section.querySelector('h2')
               h2.textContent = item.title

               // Atualiza os números com base no período
               const numbers = section.querySelector('.numbers')
               const currentHours = item.timeframes[period].current
               const previousHours = item.timeframes[period].previous


               let time = ''

               if (period === 'daily') {
                  time = 'day'
               } else if (period === 'weekly') {
                  time = 'week'
               } else {
                  time = 'month'
               }

               numbers.innerHTML = `
               <p>${currentHours}hrs</p>
               <p>Last ${time} - ${previousHours}hrs</p>
          `
            }
         })
      })
      .catch(error => {
         console.error("Error loading JSON file: ", error)
      })
}

// Funtion to change period
periods.forEach(period => {
   period.addEventListener('click', () => {
      // Remove a classe ativa de todos os períodos
      periods.forEach(p => p.classList.remove('active'))

      // Adiciona a classe ativa ao período selecionado
      period.classList.add('active')

      // Atualiza os dados com base no texto selecionado
      updateData(period.textContent.toLowerCase())
   });
});

// Initialize on weekly
const weeklyPeriod = document.querySelector('.period p:nth-child(2)')
weeklyPeriod.classList.add('active')
updateData('weekly')
