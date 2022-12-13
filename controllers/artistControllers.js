import axios from "axios";
import "dotenv/config";
import colors from "colors";
import converter from "json-2-csv";
import fs from "fs";
import { URL } from "url";

const __dirname = decodeURI(new URL("..", import.meta.url).pathname);
const FolderPath = __dirname;

// ==>> Task-1 ==>> Search for an artist by name based on the following endpoint artist.search, return all the results for this artist.
// http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=cher&api_key=YOUR_API_KEY&format=json

const getArtistByName = async (req, res) => {
  try {
    const searchParams = await req.params.search;
    const url = `https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${searchParams}&api_key=${process.env.API_KEY}&format=json`;
    const response = await axios(url);
    // receive data for matching artists
    const data = await response.data;
    // console.log(data);
    res.send(data);
    // ! Specifying the search results in the data received.
    const artistsArray = await data.results.artistmatches.artist;
    // console.log(artistsArray);

    // ==> Task-2 ==> Write the result to a user-supplied CSV filename.The CSV file should include the following information (name, mbid, url, image_small image)
    const artistsData = [];
    if (artistsArray.length > 0) {
      for (const artist of artistsArray) {
        const image_small = Object.values(artist.image[0]);
        const image = Object.values(artist.image[2]);

        artistsData.push({
          artist: artist.name,
          mbid: artist.mbid,
          url: artist.url,
          image_small: `${image_small}`,
          image: `${image}`,
        });
        // console.log(artistsData);
      }
      converter.json2csv(artistsData, (err, csv) => {
        if (err) {
          throw err;
        }
        // console.log(csv);
        // ! For writing all the data to the one CSV file use:
        // fs.writeFileSync(`${FolderPath}/search/artistsArray.csv`, csv);
        fs.writeFileSync(`${FolderPath}/search/${searchParams}.csv`, csv);
        console.log(
          "csv file has been written successfully into Search Folder.".bgGreen
        );
      });
      // ==>> Task-3==>> If no results returned from the artist.search endpoint, retrieve random artist names from a JSON dictionary source
    } else {
      fs.readFile("./mockdata.json", "utf8", (err, data) => {
        try {
          const mockData = JSON.parse(data);
          converter.json2csvAsync(mockData).then((csv) => {
            console.log(csv);
            // ! For the case if  only the names must be returned
            // mockData.forEach((db) => {
            //   console.log(`${db.name}`);
            // });
          });
        } catch (err) {
          console.log(`Error reading file from disk: ${err}`.bgRed);
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};
export { getArtistByName };
