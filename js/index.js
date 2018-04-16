let index={
    init(){
        let checkedDelete = document.querySelector('.bascket-remove__btn');
        let checkboxes=document.querySelectorAll('.product-checkbox');
        let strProducts = document.querySelectorAll('.bascket__item');
        let checkboxCount= document.querySelector('.bascket-checked_count');
        let inputnotpress=document.querySelectorAll('.input-not-keypress');
        let calcQuantAmount=document.querySelectorAll('.calc-quant-amount');
        let inputChangeCount = document.querySelectorAll('.input-change-count');
        let calcQuantAmountCancel =document.querySelectorAll('.calc-quant-amount__cancel');
        let calcQuantAmountSave =document.querySelectorAll('.calc-quant-amount__save');
        let calcQuantAmountPlus = document.querySelectorAll('.calc-quant-amount-plus');
        let calcQuantAmountMinus = document.querySelectorAll('.calc-quant-amount-minus');
        let checkCount=[];
        let vatTotal=0;
    
        document.addEventListener('click',function(e){
            console.log('etarget',e.target);
            if (!e.target.closest('.bascket__item-block').querySelector('.calc-quant-amount')){
                console.log('yes');
                console.log('click',e.target.closest('.bascket__item-block').querySelector('.calc-quant-amount'));
               deletecalcQuantAmount();
            }
            console.log('no');
            console.log('clickno',e.target);
            e.stopPropagation();
        });
        //при загрузке страницы проставляем порядковый номер у чекбоксов и рассчитываем итоговую стоимость у продуктов
        window.addEventListener('load',()=>{
            let checkboxLabel= document.querySelectorAll('.chekcbox-label');
            checkboxCount.innerHTML=0;
          
          let subTotal=totalProduct();

            let sub =subtotalCount(subTotal);
           let vat = vatTitle(subTotal);
           totalCalc(sub,vat);
            checkboxes.forEach((checkbox,ind,checkboxes)=>{
                checkboxLabel[ind].innerHTML=ind+1;
            })
          
        });
        //Расчет стоимости каждого продукта
        totalProduct=()=>{
            let bascketItemExist = document.querySelectorAll('.bascket__item');
            console.log('bascketItemExist',bascketItemExist);
            let total =document.querySelectorAll('.bascket__item-amount');
            let subTotal=0;
            total.forEach((item,ind,total)=>{
                item.innerHTML=Math.round(+item.parentNode.querySelector('.bascket__item-price').innerHTML * +item.parentNode.querySelector('.product-count').value);
                if (!bascketItemExist[ind].classList.contains('basket__item_hidden')){
                    subTotal+=+item.innerHTML;
                }
                   
                console.log('totalProduct',subTotal);
            })
            return subTotal;
        };
        //Рассчитываем промеж стоимость
        subtotalCount=(subTotal)=>{
            let subtotalSpan=document.querySelector('.subtotal-calc');
            subtotalSpan.innerHTML=Math.round(+subTotal);
            console.log('subtotalCount',subtotalSpan.innerHTML);
            return subtotalSpan.innerHTML;
        }
        //Рассчитываем НДС
        vatTitle=(subTotal)=>{
            let vatTitleSpan=document.querySelector('.vat-calc');
            vatTitleSpan.innerHTML=Math.round(subTotal*18/100);
            console.log('vatTitle',vatTitleSpan.innerHTML);
            return vatTitleSpan.innerHTML;
            console.log('totalCalc');
        }
        //Рассчитываем итого
        totalCalc=(subTotal,vat)=>{
            let total=document.querySelector('.total-calc');
            total.innerHTML=Math.round(+vat+ + subTotal);
            console.log('totalCalc',total.innerHTML);
        }
        //закрываем, если такие есть, все окна с возможностью перерасчета, которые открыты 
        deletecalcQuantAmount=()=>{
            for(var i=0;i<calcQuantAmount.length;i++){
                if (calcQuantAmount[i].classList.contains('calc-quant-amount_active')){
                    calcQuantAmount[i].classList.remove('calc-quant-amount_active');
                }
            }
           
        };

        //закрываем текущее окно с перерасчетом
        deleteCalcQuantAmountActive=(input)=>{
            console.log('2341');
            if (input.closest('calc-quant-amount_active')){
                console.log('234');
                input.classList.remove('calc-quant-amount_active');
            }
        };

        //При нажатии на кнопку Отменить закрыть текущее окно перерасчета
        calcQuantAmountCancel.forEach((item,ind,calcQuantAmountCancel)=>{
            item.addEventListener('click',function(e){
                console.log(this);
                deletecalcQuantAmount();
                
            })
        });

        //Передаем фокус на текущее открытое окно с перерасчетом
        for(var i=0;i<inputnotpress.length;i++){
            inputnotpress[i].addEventListener('mousedown',function(e){
                deletecalcQuantAmount();
                let calcAmount=this.closest('.bascket__item-calculation');
                let p =calcAmount.querySelector('.calc-quant-amount');
                console.log(p);
                p.classList.add('calc-quant-amount_active');
                calcAmount.querySelector('.calc-quant-amount-price').innerHTML=+calcAmount.querySelector('.bascket__item-price').innerHTML;
                calcAmount.querySelector('.input-change-count').value=+calcAmount.querySelector('.product-count').value;
                let total =calcAmount.querySelector('.calc-quant-amount-total');
                total.innerHTML=Math.round(+calcAmount.querySelector('.calc-quant-amount-price').innerHTML * +calcAmount.querySelector('.input-change-count').value);
                console.log('total',total.innerHTML);
                // setTimeout(() =>p.focus(),50);
            });
        };
        //Запрещаем ввод с клавиатуры в поле с количеством
        inputnotpress.forEach((input,ind,inputs)=>{
            input.addEventListener('keypress',(e)=>{
            e.preventDefault();
        });
        });
        inputChangeCount.forEach((input,ind,inputs)=>{
            input.addEventListener('keypress',(e)=>{
            e.preventDefault();
        });
        });
        //Подсчитываем количество отмеченных чекбоксов
            checkboxes.forEach((checkbox,ind,checkboxes)=>{
           
                    checkbox.addEventListener('click',()=>{
                        if (checkbox.checked){
                            if(!checkbox.closest('.basket__item_hidden')){
                                checkCount.push(1);   
                                console.log('33343434',checkCount);
                                checkboxCount.innerHTML=checkCount.length;
                            }
                            else{
                                checkCount.pop(); 
                                checkboxCount.innerHTML=checkCount.length;  
                            }
                         
                        }
                        else{
                            
                            checkCount.pop();   
                            checkboxCount.innerHTML=checkCount.length;
                        }
                        
                        console.log(checkCount);
                    })
                 
            })

            //Удаляем отмеченные чекбоксы
        checkedDelete.addEventListener('click',()=>{
            checkboxes.forEach((checkbox,ind,checkboxes)=>{
                if (checkbox.checked){
                    checkbox.closest('.bascket__item').classList.add('basket__item_hidden');
                 
                   let subTotal= totalProduct();
                   
                    let sub =subtotalCount(subTotal);
                   
                   let vat = vatTitle(subTotal);
                  
                   totalCalc(sub,vat);
                 
                   checkCount=[];   
                   checkboxCount.innerHTML=checkCount.length;
                }
            })
        })

        //Увеличиваем значение в поле с количеством на 1, а затем вызываем функцию с перерасчетом
        calcQuantAmountPlus.forEach((item,ind,arr)=>{
            item.addEventListener('click',function(){
                let itemLabel = item.parentNode.querySelector('.input-change-count');
              
                let price = +item.parentNode.querySelector('.calc-quant-amount-price').innerHTML;
                let currency =  + item.parentNode.querySelector('.calc-quant-amount-total').innerHTML;
                console.log('price',price);
                console.log('currency',currency);
               // let inputCount = itemLabel.querySelector('.input-change-count');
               let productCount=+itemLabel.value;           
               itemLabel.value=productCount+1;
               checkcurrency(this,itemLabel);
               console.log('product-count',productCount);
               console.log('item-label',itemLabel.value);
                // if (inputCount.value=0){
                //     inputCount.value=0;
                // }

            })
        });

        //текущая рассчитанная стоимость в всплывающем окне
        checkcurrency=(input,itemLabel)=>{
            let price = +input.parentNode.querySelector('.calc-quant-amount-price').innerHTML;
            let currency = input.parentNode.querySelector('.calc-quant-amount-total');
            console.log('checkcurrencyitemLabel.value',itemLabel.value);
            currency.innerHTML=Math.round(+price * +itemLabel.value);
            console.log('checkcurrency',currency);
        }
         //Уменьшаем значение в поле с количеством на 1, а затем вызываем функцию с перерасчетом
        calcQuantAmountMinus.forEach((item,ind,arr)=>{
            item.addEventListener('click',function(){
                let itemLabel = item.nextElementSibling.querySelector('.input-change-count');
               // let inputCount = itemLabel.querySelector('.input-change-count');
               let productCount=+itemLabel.value;
               itemLabel.value=productCount-1;
               console.log('product-count',productCount);
               console.log('item-label',itemLabel.value);
               itemLabel.value>0 ? checkcurrency(this,itemLabel): itemLabel.value=0; checkcurrency(this,itemLabel);
               

            })
        });
        //При нажатии на кнопку сохранить, перезаписываем на главной форме поля с количеством, стоимостью, промеж.стоимостью, ндс и итог
        calcQuantAmountSave.forEach((item,ind,calcQuantAmountSave)=>{
            item.addEventListener('click',function(){
                let parent=this.closest('.bascket__item-calculation');
                let inputChangeCount=parent.querySelector('.input-change-count');
                parent.querySelector('.product-count').value=+inputChangeCount.value;
                let subTotal= totalProduct();
                let sub =subtotalCount(subTotal);
               let vat = vatTitle(subTotal);
               totalCalc(sub,vat);
               deletecalcQuantAmount();
            })
        })
    }
};


index.init();