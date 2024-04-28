let empdata = document.getElementById("empdata")
let dep = document.getElementById("department")
let salary = document.getElementById("salary")
let gender = document.getElementById("gender")
let btnprv = document.getElementById("prv")
let btnnxt = document.getElementById("nxt")
localStorage.setItem("page",1)
let page = localStorage.getItem("page")


//created a function to fetch initial data
let getdata= async(page) =>{

        let res = await fetch(`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?&page=${page||1}&limit=10`)
        let data = await res.json()
        fetchdata(data.data)
        
}
// runining fetch function
getdata()

// created the function to show data to dom using foreach
let fetchdata = (data) =>{
        empdata.innerHTML=""
        data.forEach((ele) => {
                //creating data to show on dom
                let row = document.createElement("tr")
                let td1 = document.createElement('td')
                td1.innerText =ele.id
                let td2 = document.createElement("td")
                td2.innerText =ele.name
                let td3 = document.createElement("td")
                td3.innerText =ele.gender
                let td4 = document.createElement("td")
                td4.innerText =ele.department
                let td5 = document.createElement("td")
                td5.innerText =ele.salary
                //appending the data
                row.append(td1,td2,td3,td4,td5)
                empdata.append(row)
        });
        
}

// created a functin to filter data by department
let filterdatabydepartment = async() =>{
        let res = await fetch(`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=1&limit=10${dep.value}${salary.value}`)
        let data2 = await res.json()
        fetchdata(data2.data)
}

// created a functin to filter data by gender
let filterdatabygender = async() =>{
        let res = await fetch(`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=1&limit=10${gender.value}${salary.value}`)
        let data4 = await res.json()
        fetchdata(data4.data)
}

// created a functin to sort data by salary
let sortdata = async(page) =>{
        let res = await fetch(`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=1&limit=10${dep.value}${gender.value}${salary.value}`)
        let data4 = await res.json()
        fetchdata(data4.data)
}

// created fundtions next and previous for pagination onclick event
let next = () =>{
        let page=Number(localStorage.getItem("page"))
        if(page<=9)
        {
        page=page+1
        localStorage.setItem("page",page)
        getdata(page)
        btnprv.disabled=false
        }
        else
        {

                btnnxt.disabled=true
        }
        console.log(page);
}

let previous = () =>{
        let page=Number(localStorage.getItem("page"))
        if(page>=2)
        {
        page= page-1
        localStorage.setItem("page",page)
        getdata(page)
        btnnxt.disabled= false
        }
        else
        {
           btnprv.disabled=true

        }
}