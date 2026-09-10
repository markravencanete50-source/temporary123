/**
 * Service area data: every US state (plus DC) and the cities we quote in.
 * Add a city by appending it to the state's list — the homepage section,
 * the /service-areas page and the sitemap all read from here.
 */

const RAW: Record<string, string> = {
  Alabama: "Birmingham,Montgomery,Huntsville,Mobile,Tuscaloosa,Hoover,Dothan,Auburn,Decatur,Madison",
  Alaska: "Anchorage,Fairbanks,Juneau,Wasilla,Sitka,Ketchikan,Kenai,Kodiak,Bethel,Palmer",
  Arizona:
    "Phoenix,Tucson,Mesa,Chandler,Scottsdale,Glendale,Gilbert,Tempe,Peoria,Flagstaff,Yuma,Surprise",
  Arkansas:
    "Little Rock,Fort Smith,Fayetteville,Springdale,Jonesboro,Rogers,Conway,North Little Rock,Bentonville,Pine Bluff",
  California:
    "Los Angeles,San Diego,San Jose,San Francisco,Fresno,Sacramento,Long Beach,Oakland,Bakersfield,Anaheim,Riverside,Santa Ana,Irvine,Stockton,Fremont",
  Colorado:
    "Denver,Colorado Springs,Aurora,Fort Collins,Lakewood,Thornton,Pueblo,Boulder,Greeley,Longmont",
  Connecticut:
    "Bridgeport,New Haven,Hartford,Stamford,Waterbury,Norwalk,Danbury,New Britain,Bristol,Meriden",
  Delaware: "Wilmington,Dover,Newark,Middletown,Smyrna,Milford,Seaford,Georgetown,Elsmere,New Castle",
  "District of Columbia": "Washington",
  Florida:
    "Jacksonville,Miami,Tampa,Orlando,St. Petersburg,Hialeah,Port St. Lucie,Tallahassee,Cape Coral,Fort Lauderdale,Pembroke Pines,Hollywood,Gainesville,Naples",
  Georgia:
    "Atlanta,Augusta,Columbus,Macon,Savannah,Athens,Sandy Springs,Roswell,Albany,Marietta,Valdosta",
  Hawaii: "Honolulu,Pearl City,Hilo,Kailua,Waipahu,Kaneohe,Kahului,Kihei,Ewa Beach,Mililani Town",
  Idaho: "Boise,Meridian,Nampa,Idaho Falls,Pocatello,Caldwell,Coeur d'Alene,Twin Falls,Post Falls,Rexburg",
  Illinois:
    "Chicago,Aurora,Joliet,Naperville,Rockford,Springfield,Elgin,Peoria,Champaign,Waukegan,Bloomington",
  Indiana:
    "Indianapolis,Fort Wayne,Evansville,South Bend,Carmel,Fishers,Bloomington,Hammond,Gary,Lafayette,Muncie",
  Iowa: "Des Moines,Cedar Rapids,Davenport,Sioux City,Iowa City,Waterloo,Council Bluffs,Ames,Dubuque,Ankeny",
  Kansas: "Wichita,Overland Park,Kansas City,Olathe,Topeka,Lawrence,Shawnee,Manhattan,Lenexa,Salina",
  Kentucky:
    "Louisville,Lexington,Bowling Green,Owensboro,Covington,Richmond,Georgetown,Florence,Hopkinsville,Nicholasville",
  Louisiana:
    "New Orleans,Baton Rouge,Shreveport,Lafayette,Lake Charles,Kenner,Bossier City,Monroe,Alexandria,Houma",
  Maine: "Portland,Lewiston,Bangor,South Portland,Auburn,Biddeford,Sanford,Augusta,Saco,Westbrook",
  Maryland:
    "Baltimore,Frederick,Rockville,Gaithersburg,Bowie,Hagerstown,Annapolis,Salisbury,College Park,Silver Spring",
  Massachusetts:
    "Boston,Worcester,Springfield,Cambridge,Lowell,Brockton,Quincy,New Bedford,Lynn,Fall River,Newton",
  Michigan:
    "Detroit,Grand Rapids,Warren,Sterling Heights,Ann Arbor,Lansing,Flint,Dearborn,Livonia,Troy,Kalamazoo",
  Minnesota:
    "Minneapolis,St. Paul,Rochester,Duluth,Bloomington,Brooklyn Park,Plymouth,St. Cloud,Eagan,Woodbury",
  Mississippi:
    "Jackson,Gulfport,Southaven,Biloxi,Hattiesburg,Olive Branch,Tupelo,Meridian,Greenville,Starkville",
  Missouri:
    "Kansas City,St. Louis,Springfield,Columbia,Independence,Lee's Summit,O'Fallon,St. Joseph,St. Charles,Joplin",
  Montana: "Billings,Missoula,Great Falls,Bozeman,Butte,Helena,Kalispell,Havre,Anaconda,Whitefish",
  Nebraska: "Omaha,Lincoln,Bellevue,Grand Island,Kearney,Fremont,Hastings,Norfolk,North Platte,Papillion",
  Nevada: "Las Vegas,Henderson,Reno,North Las Vegas,Sparks,Carson City,Elko,Mesquite,Boulder City,Fernley",
  "New Hampshire":
    "Manchester,Nashua,Concord,Derry,Dover,Rochester,Salem,Merrimack,Hudson,Londonderry",
  "New Jersey":
    "Newark,Jersey City,Paterson,Elizabeth,Edison,Trenton,Clifton,Camden,Passaic,Atlantic City,Toms River",
  "New Mexico":
    "Albuquerque,Las Cruces,Rio Rancho,Santa Fe,Roswell,Farmington,Clovis,Hobbs,Alamogordo,Carlsbad",
  "New York":
    "New York City,Buffalo,Rochester,Yonkers,Syracuse,Albany,New Rochelle,Mount Vernon,Schenectady,Utica,White Plains,Brooklyn,Queens,Bronx",
  "North Carolina":
    "Charlotte,Raleigh,Greensboro,Durham,Winston-Salem,Fayetteville,Cary,Wilmington,High Point,Asheville,Concord",
  "North Dakota": "Fargo,Bismarck,Grand Forks,Minot,West Fargo,Williston,Dickinson,Mandan,Jamestown,Watford City",
  Ohio: "Columbus,Cleveland,Cincinnati,Toledo,Akron,Dayton,Parma,Canton,Youngstown,Lorain,Springfield",
  Oklahoma:
    "Oklahoma City,Tulsa,Norman,Broken Arrow,Edmond,Lawton,Moore,Midwest City,Stillwater,Enid",
  Oregon: "Portland,Eugene,Salem,Gresham,Hillsboro,Beaverton,Bend,Medford,Springfield,Corvallis",
  Pennsylvania:
    "Philadelphia,Pittsburgh,Allentown,Erie,Reading,Scranton,Bethlehem,Lancaster,Harrisburg,Altoona,York",
  "Rhode Island":
    "Providence,Warwick,Cranston,Pawtucket,East Providence,Woonsocket,Newport,Central Falls,Westerly,Bristol",
  "South Carolina":
    "Charleston,Columbia,North Charleston,Mount Pleasant,Rock Hill,Greenville,Summerville,Myrtle Beach,Spartanburg,Florence",
  "South Dakota": "Sioux Falls,Rapid City,Aberdeen,Brookings,Watertown,Mitchell,Yankton,Pierre,Huron,Spearfish",
  Tennessee:
    "Nashville,Memphis,Knoxville,Chattanooga,Clarksville,Murfreesboro,Franklin,Jackson,Johnson City,Kingsport",
  Texas:
    "Houston,San Antonio,Dallas,Austin,Fort Worth,El Paso,Arlington,Corpus Christi,Plano,Laredo,Lubbock,Irving,Garland,Amarillo,McKinney,Midland,Odessa",
  Utah: "Salt Lake City,West Valley City,Provo,West Jordan,Orem,Sandy,Ogden,St. George,Layton,Lehi",
  Vermont: "Burlington,South Burlington,Rutland,Essex Junction,Barre,Montpelier,St. Albans,Winooski,Newport,Vergennes",
  Virginia:
    "Virginia Beach,Norfolk,Chesapeake,Richmond,Newport News,Alexandria,Hampton,Roanoke,Arlington,Lynchburg,Charlottesville",
  Washington:
    "Seattle,Spokane,Tacoma,Vancouver,Bellevue,Kent,Everett,Renton,Yakima,Federal Way,Bellingham,Olympia",
  "West Virginia":
    "Charleston,Huntington,Morgantown,Parkersburg,Wheeling,Martinsburg,Fairmont,Beckley,Clarksburg,Weirton",
  Wisconsin:
    "Milwaukee,Madison,Green Bay,Kenosha,Racine,Appleton,Waukesha,Oshkosh,Eau Claire,Janesville,La Crosse",
  Wyoming: "Cheyenne,Casper,Laramie,Gillette,Rock Springs,Sheridan,Green River,Evanston,Riverton,Jackson",
};

export interface StateArea {
  state: string;
  cities: string[];
}

export const serviceAreas: StateArea[] = Object.entries(RAW).map(([state, cities]) => ({
  state,
  cities: cities.split(",").map((c) => c.trim()),
}));

export const stateNames: string[] = serviceAreas.map((a) => a.state);

export const totalCities: number = serviceAreas.reduce((sum, a) => sum + a.cities.length, 0);

export const SERVICE_AREAS_PATH = "/service-areas";
