function addRow() {
    const table = document.getElementById('activitiesTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    const nameCell = newRow.insertCell(0);
    const shortNameCell = newRow.insertCell(1);
    const weightCell = newRow.insertCell(2);
    const gradeCell = newRow.insertCell(3);
    const percentCell = newRow.insertCell(4);

    nameCell.innerHTML = '<input type="text" name="name" value="Activity">';
    shortNameCell.innerHTML = '<input type="text" name="shortName" value="A">';
    weightCell.innerHTML = '<input type="number" name="weight" value="0" onchange="calculatePercentages()">';
    gradeCell.innerHTML = '<input type="number" name="gradeObtained" value="0" onchange="calculatePercentages()"> / <input type="number" name="gradeTotal" value="100" onchange="calculatePercentages()">';
    percentCell.className = 'percent';
    percentCell.innerHTML = '0%';
}

function calculatePercentages() {
    const table = document.getElementById('activitiesTable');
    const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    
    for (let row of rows) {
        const gradeObtained = row.querySelector('input[name="gradeObtained"]').value;
        const gradeTotal = row.querySelector('input[name="gradeTotal"]').value;
        const percentCell = row.querySelector('.percent');

        if (gradeTotal != 0) {
            const percent = (gradeObtained / gradeTotal) * 100;
            percentCell.innerText = percent.toFixed(2) + '%';
        } else {
            percentCell.innerText = '0%';
        }
    }
}

function calculateMean() {
    const table = document.getElementById('activitiesTable');
    const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    
    let totalPercent = 0;
    let count = 0;

    for (let row of rows) {
        const gradeObtained = parseFloat(row.querySelector('input[name="gradeObtained"]').value);
        const gradeTotal = parseFloat(row.querySelector('input[name="gradeTotal"]').value);
        
        if (gradeTotal != 0) {
            totalPercent += (gradeObtained / gradeTotal);
            count++;
        }
    }

    const mean = totalPercent / count * 100;
    document.getElementById('result').innerText = 'Mean: ' + mean.toFixed(2) + '%';
}

function calculateWeighted() {
    const table = document.getElementById('activitiesTable');
    const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    
    let totalWeighted = 0;
    let totalWeight = 0;

    for (let row of rows) {
        const weight = parseFloat(row.querySelector('input[name="weight"]').value);
        const gradeObtained = parseFloat(row.querySelector('input[name="gradeObtained"]').value);
        const gradeTotal = parseFloat(row.querySelector('input[name="gradeTotal"]').value);
        
        if (gradeTotal != 0) {
            totalWeighted += (gradeObtained / gradeTotal) * weight;
            totalWeight += weight;
        }
    }

    const weightedMean = totalWeighted / totalWeight * 100;
    document.getElementById('result').innerText = 'Weighted Mean: ' + weightedMean.toFixed(2) + '%';
}
