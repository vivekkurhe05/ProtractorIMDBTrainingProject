var imdb_page = function(){


    this.goToMenuList = function(){


        return $('div[id="megaMenu"]>ul>:nth-child(2)>span').click();
    };


    this.clickOnTopMoviesLink = function(){

        return $('div[id="megaMenu"]>ul>li[id="navTitleMenu"]>div>div[class="subNavListContainer"]>ul>:nth-child(6)>a[href^="/chart/"]');
    };

    this.getMovieTitles = function(){

        /**
         * 
         * This locator fetches all movie titles
         */
        
        return $$('table[data-caller-name="chart-top250movie"]>tbody>tr>td[class="titleColumn"]>a');
    };


    this.getMovieReleaseYears = function(years){

        /**
         * 
         * 
         * This locator fetches all release years
         */
        return $$('table[data-caller-name="chart-top250movie"]>tbody>tr>td[class="titleColumn"]>span');
    };


    this.getMovieRatings = function(ratings){

        /**
         * 
         * This locator fetches all ratings
         */
        return $$('table[data-caller-name="chart-top250movie"]>tbody>tr>td[class="ratingColumn imdbRating"]>strong');
    };


    this.getImdbSortByDropdown = function(){
        

        /**
         * 
         * This is used to get dropdown values
         */
        return $$('select[name="sort"]>option');

    };

    this.selectImdbDropdown = function(selectValue){

        /**
         * 
         * Perform click operation on dropdown
         */
        return $$('select[name="sort"]>option[value="'+selectValue+'"]').click();

    };

};


// This makes the imdb_page public and is accessible from anywhere
module.exports = new imdb_page();