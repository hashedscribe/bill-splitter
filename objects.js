// object definitions

function apply_tax(price, tax){
    return (price*(tax+1)).toFixed(2)
}

function sum_items(items){
    let total = 0;
    for(let i = 0; i < items.length; i++){
        total += items[i].price;
    }
    return total;
}

class Header{
    // string, datetime/string, arr or obj, obj 
    constructor(location, date, guests, receipt){
        this.location = location;
        this.date = date;
        this.guests = guests;
        this.receipt = receipt;
    }
}

class Receipt{
    constructor(tax, subtotal, tip){
        this.tax = tax;
        this.subtotal = subtotal;
        this.tip = tip;
        this.total = total;
        this.items = []
    }

    is_valid_receipt(){
        return (
            this.subtotal >= 0 &&
            this.tax >= 0 &&
            this.tax <= 1 && //itd be crazy to have tax thats >100% but no
            this.tip >= 0 &&
            this.total >= 0
        );
    }

    get_receipt_summary(){
        return summary = {
            calculated_subtotal: sum_items(this.items),
            given_subtotal: this.subtotal,
            calculated_total: apply_tax(summary.subtotal, this.tax) + this.tip,
            given_total: this.total,
        };
    }

    print_receipt_summary(summary){
        console.log("Number of items counted: " + summary.num_of_items);

        stotal_msg = "Calculated SUBTOTAL of " + summary.given_subtotal;
        sdif = abs(summary.calculated_subtotal - summary.given_subtotal);
        if(sdif <= 0.01){
            console.log(stotal_msg + " matches given SUBTOTAL.");
        }else if (sdif <= 0.05){
            console.log(stotal_msg + "within 5 cents of given SUBTOTAL.");
            console.log("This could be due to a difference in rounding method.");
        }else{
            console.log(stotal_msg + "differs from given SUBTOTAL by" + sdif);
            console.log("There may be an item missing.");
        }

        total_msg = "Calculated TOTAL of " + summary.given_total;
        tdif = abs(summary.calculated_total - summary.given_total);
        if(tdif <= 0.01){
            console.log(total_msg + " matches given TOTAL.");
        }else if (tdif <= 0.05){
            console.log(total_msg + "within 5 cents of given TOTAL.");
            console.log("This could be due to a difference in rounding method.");
        }else{
            console.log(total_msg + "differs from given TOTAL by" + tdif);
            console.log("The tax rate provided may not be correct.");
        }
    }
}

class Item{
    constructor(name, price){
        this.name = name;
        this.price = price;
        this.people = [];
    }

    get_item_summary(header){
        return summary = {
            item: this.name,
            price: this.price,
            n_people: this.people.length,
            people: this.people
        }
    }

    print_item_summary(summary){
    //     if(header.guests.length === summary.n_people){summary.people = "Everyone";}
    //     else if(summary.n_people === 0) summary.people
    //     else{
    //         for(let i = 0; i < this.people.length; i++){
    //             summary.people += this.people[i].name + ", ";
    //         }
    //         summary.people = summary.people.substring(0, summary.people.length-2);
    //     }
    }
}

class Guest{
    constructor(name){
        this.name = name;
        this.items = [];
        this.subtotal = 0;
    }

    is_valid_user(){
        return(
            this.name != "" &&
            this.subtotal >= 0
        )
    }

    add_item(item){
        this.items.push(item);
        this.subtotal += item.price;
        item.people.push(this);
    }
}