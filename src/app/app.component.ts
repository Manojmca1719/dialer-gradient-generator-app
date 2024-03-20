import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { colord, extend } from 'colord';
import mixPlugin from 'colord/plugins/mix';

extend([mixPlugin]);
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  public displayedOuterColors: Array<any> = [];
  public displayedInnerColors: Array<any> = [];
  public outerCirclePalete: any;
  public innerCirclePalete: any;
  public outerChoosenColor: any;
  public innerChoosenColor: any;
  public resultGradientColor: any;

  public isToastShow: boolean = false;
  public copyText: string = '';
  constructor() {
    this.generateColor();
    this.outerChoosenColor = this.displayedOuterColors[0];
    this.innerChoosenColor = this.displayedInnerColors[0];
  }

  ngAfterViewInit() {
    this.outerCirclePalete = document.querySelector(
      '.outer-circle-palete',
    ) as HTMLElement;
    this.innerCirclePalete = document.querySelector(
      '.inner-circle-palete',
    ) as HTMLElement;
    this.resultGradientColor = document.querySelector(
      '.result-gradient',
    ) as HTMLElement;
    this.copyText =
      'background: linear-gradient(140deg, ' +
      this.outerChoosenColor.code +
      ' 0%, ' +
      this.outerChoosenColor.code +
      ' 35%, ' +
      this.innerChoosenColor.code +
      ' 100%)';
  }

  public generateColor() {
    for (let i = 0; i < 25; i++) {
      let colorCode =
        '#' +
        Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, '0')
          .toUpperCase();
      let newObj = {
        code: colorCode,
        id: i + 1,
        pos: i,
      };
      this.displayedOuterColors.push(newObj);
    }
    this.displayedInnerColors = JSON.parse(
      JSON.stringify(this.displayedOuterColors),
    );
    this.displayedInnerColors.forEach(
      (darkenColor) =>
        (darkenColor['code'] = colord(darkenColor.code).lighten(0.2).toHex()),
    );
  }

  public rotateOuterCircle(index: any, outerColor: any) {
    this.outerChoosenColor = outerColor;
    this.copyText =
      'background: linear-gradient(140deg, ' +
      this.outerChoosenColor.code +
      ' 0%, ' +
      this.outerChoosenColor.code +
      ' 35%, ' +
      this.innerChoosenColor.code +
      ' 100%)';
    let calcRotateDeg = 360 - index * 14.4;
    // console.log(calcRotateDeg);
    this.outerCirclePalete.style.transform =
      'translateY(250px) rotate(' + calcRotateDeg + 'deg)';
    this.outerCirclePalete.style.transistion = 'transform 5s';
    // this.reCalcualtePos(this.displayedOuterColors, index);
    console.log(this.copyText);
  }

  public rotateInnerCircle(index: any, innerColor: any) {
    this.innerChoosenColor = innerColor;
    this.copyText =
      'background: linear-gradient(140deg, ' +
      this.outerChoosenColor.code +
      ' 0%, ' +
      this.outerChoosenColor.code +
      ' 35%, ' +
      this.innerChoosenColor.code +
      ' 100%)';
    let calcRotateDeg = 360 - index * 14.4;
    this.innerCirclePalete.style.transform =
      'translateY(200px) rotate(' + calcRotateDeg + 'deg)';
    // this.resultGradientColor.style.transform = 'rotate(-' + calcRotateDeg + 'deg)';
    this.innerCirclePalete.style.transistion = 'transform 5s';
    console.log(this.copyText);
  }

  public reCalcualtePos(data: any, index: any) {
    let decIndexPos = 0;
    let incIndexPos = 2;
    for (let i = index - 1; i >= 0; i--) {
      data[i]['pos'] = data.length - decIndexPos;
      decIndexPos++;
    }
    for (let i = index + 1; i < data.length; i++) {
      data[i]['pos'] = incIndexPos;
      incIndexPos++;
    }
    data[index]['pos'] = 1;
    // console.log(this.displayedOuterColors);
  }

  public copyColorCode(color: any) {
    console.log(color);
    navigator.clipboard.writeText(color);
    this.isToastShow = true;
    setTimeout(() => {
      this.isToastShow = false;
    }, 1000);
  }
}
