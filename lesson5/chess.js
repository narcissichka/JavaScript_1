document.querySelector('body').style.boxSizing = 'border-box';
var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
function createDesk() {
    var tr, td;
    var table = document.createElement('table');
    for (var i = 0; i < 10; i++) {
        tr = document.createElement('tr');
        table.append(tr);
        for (var j = 0; j < 10; j++) {
            td = document.createElement('td');
            tr.append(td);
            td.style.textAlign = 'center';
            td.style.width = '10%';

            if (i % 2 != 0 && i != 9) {
                if ((j % 2 == 0 && j != 0))
                    td.style.backgroundColor = '#3A2E20';
                else if (j != 9 && j != 0)
                    td.style.backgroundColor = '#DAC2A6';
            } else if (i % 2 == 0 && i != 0) {
                if (j % 2 != 0 && j != 9)
                    td.style.backgroundColor = '#3A2E20';
                else if (j != 0 && j != 9)
                    td.style.backgroundColor = '#DAC2A6';
            }

            if (i == 1 || i == 8) {
                if (j == 1 || j == 8) {
                    td.innerHTML = '<i class="fas fa-chess-rook"></i>';
                } else if (j == 2 || j == 7) {
                    td.innerHTML = '<i class="fas fa-chess-knight"></i>'
                } else if (j == 3 || j == 6) {
                    td.innerHTML = '<i class="fas fa-chess-bishop"></i>';
                } else if (j == 4) {
                    td.innerHTML = '<i class="fas fa-chess-king"></i>';
                } else if (j == 5) {
                    td.innerHTML = '<i class="fas fa-chess-queen"></i>';
                }

                if (i == 1) {
                    td.style.color = 'white';
                    td.style.transform = 'rotate(180deg)'
                } else {
                    td.style.color = 'black';
                }
                td.style.fontSize = '24px';
            } else if ((i == 2 || i == 7) && (j != 0 && j != 9)) {
                td.innerHTML = '<i class="fas fa-chess-pawn"></i>';
                if (i == 2) {
                    td.style.color = 'white';
                    td.style.transform = 'rotate(180deg)'
                } else {
                    td.style.color = 'black';
                }
                td.style.fontSize = '24px';
            }


            if (j == 0 || j == 9 || i == 0 || i == 9) {
                td.style.backgroundColor = '#271F15';
            }

            if ((i == 0 || i == 9) && (j != 0 && j != 9)) {
                td.innerHTML = '<p>' + letters[j - 1] + '</p>';
                td.style.color = '#F2EBE2';
                td.style.fontSize = '14px';
                if (i == 0) {
                    td.style.transform = 'rotate(180deg)'
                }
            } else if ((j == 0 || j == 9) && (i != 0 && i != 9)) {
                td.innerHTML = '<p>' + i + '</p>';
                td.style.color = '#F2EBE2';
                td.style.fontSize = '14px';
                if (j == 9) {
                    td.style.transform = 'rotate(180deg)';
                }
            }

        }
    }
    table.style.width = '100%';
    table.style.height = '100%';
    table.style.borderCollapse = 'collapse';
    return table;
}
div = document.querySelector('div');
div.style.width = '530px';
div.style.height = '500px';
div.style.margin = '10vh auto'
div.append(createDesk());
