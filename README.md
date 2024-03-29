Firstly download node, progresql in local machine, then install properly. Then

Download repositary from github use command below mentioned to install packages
    npm install

Use correct credentials to connect to db, if you already have a testDB means, change those things in config/db.config.js file and connect to DB

Then create Item, Organization, and Pricing datas with triggering apis mentioned in 'index.js' file

Once tables are created, then calculation is done in "localhost:3000/price" api