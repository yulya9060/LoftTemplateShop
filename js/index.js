let index={
    init(){
        let checkedDelete = document.querySelector('.bascket-remove__btn');
        let checkboxes=document.querySelectorAll('.product-checkbox');
        let strProducts = document.querySelectorAll('.bascket__item');
        let checkboxCount= document.querySelector('.bascket-checked_count');
        let inputnotpress=document.querySelectorAll('.input-not-keypress');
        let calcQuantAmount=document.querySelectorAll('.calc-quant-amount');
        let checkCount=[];
    
        window.addEventListener('load',()=>{
            let checkboxLabel= document.querySelectorAll('.chekcbox-label');
            checkboxCount.innerHTML=0;
            checkboxes.forEach((checkbox,ind,checkboxes)=>{
                checkboxLabel[ind].innerHTML=ind+1;
            })
          
        });
        deletecalcQuantAmount=()=>{
            for(var i=0;i<calcQuantAmount.length;i++){
                if (calcQuantAmount[i].classList.contains('calc-quant-amount_active')){
                    calcQuantAmount[i].classList.remove('calc-quant-amount_active');
                }
            }
           
        };
        for(var i=0;i<calcQuantAmount.length;i++){
            console.log('2');
            calcQuantAmount[i].addEventListener('blur',function(e){
                console.log('23');
                if (this.classList.contains('calc-quant-amount_active')){
                    console.log('234');
                    this.classList.remove('calc-quant-amount_active');
                }
            })
        };
        for(var i=0;i<inputnotpress.length;i++){
            inputnotpress[i].addEventListener('mousedown',function(e){
                deletecalcQuantAmount();
                console.log(this);
                this.parentElement.parentElement.querySelector('.calc-quant-amount').classList.add('calc-quant-amount_active');
                console.log( this.closest('.bascket__item-calculation'));
                let p=this.closest('.bascket__item-calculation');
                p.querySelector('.input-change-count');
                console.log( p.querySelector('.input-change-count'));
                 setTimeout(() =>p.querySelector('.input-change-count').focus(),50);
            });
        };
        inputnotpress.forEach((input,ind,inputs)=>{
            input.addEventListener('keypress',(e)=>{
            e.preventDefault();
        });
        });
            checkboxes.forEach((checkbox,ind,checkboxes)=>{
           
                    checkbox.addEventListener('click',()=>{
                        if (checkbox.checked){
                            checkCount.push(1);   
                            console.log(checkCount);
                            checkboxCount.innerHTML=checkCount.length;
                        }
                        else{
                            
                            checkCount.pop();   
                            checkboxCount.innerHTML=checkCount.length;
                        }
                        
                        console.log(checkCount);
                    })
                 
            })
        checkedDelete.addEventListener('click',()=>{
            checkboxes.forEach((checkbox,ind,checkboxes)=>{
                if (checkbox.checked){
                    checkbox.closest('.bascket__item').style.display='none';
                    console.log(checkbox.nextElementSibling );
                    
                }
            })
        })
    }
};


index.init();