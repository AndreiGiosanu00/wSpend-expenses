import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import {AuthService} from "../../../services/auth.service";
import {LoadingService} from "../../../services/loading.service";

@Component({
  selector: 'cdk-doughnut-graph',
  templateUrl: './doughnut-graph.component.html',
  styleUrls: ['./doughnut-graph.component.scss']
})
export class DoughnutGraphComponent implements OnInit {

    private data = {
        food: 0,
        utilities: 0,
        entertainment: 0,
        shopping: 0
    };

  constructor(private authService: AuthService,
              private loadingService: LoadingService) { }

  ngOnInit() {
      setTimeout(() => {
          this.authService.getAllExpenses().subscribe((result: any) => {
              let expenses = result.expenses;
              let currentDate = new Date();
              expenses.forEach((expense) => {
                  let expenseDate = new Date(expense.date);
                  if (currentDate.getMonth() == expenseDate.getMonth()) {
                      if (expense.category == 'Food') {
                          this.data.food += (+expense.price);
                      }
                      if (expense.category == 'Utilities') {
                          this.data.utilities += (+expense.price);
                      }
                      if (expense.category == 'Shopping') {
                          this.data.shopping += (+expense.price);
                      }
                      if (expense.category == 'Entertainment') {
                          this.data.entertainment += (+expense.price);
                      }
                  }
              });
              this.createDoughnutGraph();
          });
      },500)

  }
    randomNumber(min=0, max=0) {
        if(min==0 || max== 0)
            return Math.round(Math.random() * 100);
        else
            return Math.random() * (max - min) + min;
    };
    randomBar(date, lastClose) {
        var open = this.randomNumber(lastClose * .95, lastClose * 1.05);
        var close = this.randomNumber(open * .95, open * 1.05);
        var high = this.randomNumber(Math.max(open, close), Math.max(open, close) * 1.1);
        var low = this.randomNumber(Math.min(open, close) * .9, Math.min(open, close));
        return {
            t: date.valueOf(),
            y: close
        };
    }

    createDoughnutGraph() {
        new Chart('doughnut-graph-graph', {
            type: 'doughnut',
            data: {
            labels: ['Food ', 'Entertainment ', 'Shopping ', 'Utilities '],
            datasets: [ {
                data: [
                    this.data.food,
                    this.data.entertainment,
                    this.data.shopping,
                    this.data.utilities,
                ],
                backgroundColor: [
                    '#F8796E',
                    '#3E4E68',
                    'rgba(38, 166, 154,.7)',
                    'rgba(102, 187, 106,.7)'
                ],
            }]},
            options: {
                elements : {
                    line: {
                        tension: 0.000001
                    }
                },
                legend: {
                    display: false
                },
                maintainAspectRatio: false,
                responsive: true,
                plugins: {
                    filler: {
                        propagate: false
                    }
                },
                title: {
                    display: true,
                    text: 'JUNE EXPENSES'
                }
            }

    })
  }

}
