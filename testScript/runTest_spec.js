describe('IMDB website automation tests', function(){

    var imdb_page = require('../pages/imdb_page.js');
    var my_db = require('../database/simple-chaining.js');
    beforeEach(function(){


        /**
         * 
         * Hits URL and select menu list
         */
        browser.get('https://www.imdb.com/');
        imdb_page.goToMenuList();
    

        /**
         * 
         * This waits for link to be visible
         */
        var topRatedMovies = protractor.ExpectedConditions;
        browser.wait(topRatedMovies.visibilityOf(imdb_page.clickOnTopMoviesLink()), 30000);
        imdb_page.clickOnTopMoviesLink().click();
        
    });

    
    it('stores movie details in SQLite and display the result on console', async function(){

        /**
         * 
         * three different arrays
         */

        var get_titles = await imdb_page.getMovieTitles().getText();
        var get_release_years = await imdb_page.getMovieReleaseYears().getText();
        var get_ratings = await imdb_page.getMovieRatings().getText();

        /***
         * 
         * will delete the records available in table
         */
        my_db.deleteRecords();

        /**
         * 
         * will read titles, release years and ratings from arrays and store into the db
         */
        for(var i=0;i<get_titles.length;i++){
            
            my_db.insertRows(get_titles[i], get_release_years[i], get_ratings[i]);
            if(i===250){
                my_db.closeDb();
            }

        }

        /***
         * 
         * display the result on console stored into db
         */
        my_db.readAllRows();
    });

 
    it('display total movie counts on console', async function(){

        /*
        
            This stores count of movie titles, release years and ratings
        */
       var total_movie_titles = await imdb_page.getMovieTitles().count();
       var total_movie_release_years = await imdb_page.getMovieReleaseYears().count();
       var total_movie_ratings = await imdb_page.getMovieRatings().count();

       for(var i=0;i<80;i++){
           process.stdout.write(`${"-"}`);
       }

       /**
        * 
        * this prints the title, release years and ratings count
        * 
        */
       console.log('\nTotal movie titles are => ', total_movie_titles);
       expect(total_movie_titles).toEqual(250);
       console.log('Total movie release years are => ', total_movie_release_years);
       expect(total_movie_release_years).toEqual(250);
       console.log('Total movie ratings are => ', total_movie_ratings);
       expect(total_movie_ratings).toEqual(250);
    });


    it('display imdb dropdown values', async function(){

        /**
         * 
         * cross checking expected values with actual values
         */
        var expected_values = ['Ranking','IMDb Rating','Release Date','Number of Ratings','Your Rating'];
        var sort_by_values = await imdb_page.getImdbSortByDropdown().getText();

        /**
         * 
         * this will get the list from dropdown
         */
        sort_by_values=sort_by_values.map(function(el){
            return el.trim();
        });

        
        for(var i=0;i<80;i++){
            process.stdout.write(`${"-"}`);
        }
        console.log('\nExpected values in a dropdown are\n');


        /**
         * this will display the list
         */
        sort_by_values.forEach(function(values){
            console.log(values);
        });
        

        /**
         * 
         * this will compare the 
         */
        expect(sort_by_values).toEqual(expected_values);
    });


    
    it('match total count from imdb dropdown', async function(){

        /**
         * it counts total options from dropdown
         */
        var total_options = await imdb_page.getImdbSortByDropdown().count();

        
        for(var i=0;i<80;i++){
            process.stdout.write(`${"-"}`);
        }
        console.log('\n');
        console.log('Total values in dropdown are => ', total_options);
        expect(total_options).toEqual(5);
    });


    

    it('select values from dropdown and display the list on console', async function(){

        
        for(var i=0;i<80;i++){
            process.stdout.write(`${"-"}`);
        }
        console.log('\nDisplaying movie details as per release years');

        /**
         * 
         * it selects value from dropdown i.e. "Release Years" and sorts result on console accordingly
         */
        imdb_page.selectImdbDropdown('us:descending');


        var get_titles = await imdb_page.getMovieTitles().getText();
        var get_release_years = await imdb_page.getMovieReleaseYears().getText();
        var get_ratings = await imdb_page.getMovieRatings().getText();

        var count = 1;
        console.log('\n');
        for(var i=0;i<80;i++){
            process.stdout.write(`${"-"}`);
        }
        console.log('\n');
        for(var i=0;i<get_titles.length;i++){
            console.log((count++)+'. '+get_titles[i]+' '+get_release_years[i]+' '+get_ratings[i]);
            
        }

    });

});