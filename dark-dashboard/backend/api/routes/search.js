const axios = require("axios");
const { Router } = require("express");
const router = Router();
const { Posts } = require("../../models");
const { Client } = require("@elastic/elasticsearch");
const client = new Client({ node: "http://localhost:9200" });
const crypto = require("crypto");

async function indices(client, index, properties) {
  client.indices.exists(
    {
      index,
    },
    (err, res, status) => {
      if (res.body) {
        console.log("Index exists!");
      } else {
        client.indices.create(
          {
            index,
            body: {
              mappings: {
                properties: {
                  ...properties,
                },
              },
            },
          },
          (err, res, status) => {
            console.log(err, res, status);
          }
        );
      }
    }
  );
}
const dataProps = {
  id: { type: "integer" },
  title: { type: "text" },
  authorName: { type: "text" },
  content: { type: "text" },
  postTime: { type: "text" },
};

router.post("/seed-elastic", async (request, response) => {
  indices(client, "posts", dataProps);
  const data = await Posts.findAll();
  const body = data.flatMap((doc) => {
    const _id = crypto
      .createHash("md5")
      .update(doc.postTime + doc.title)
      .digest("hex");
    return [{ index: { _index: "posts", _id } }, doc];
  });
  const bulkResponse = await client.bulk({ refresh: true, body });
  response.json(bulkResponse);
});

router.get("/:query", async (request, response) => {
  const filterQuery = request.params.query;
  try {
    // const { body } = await client.search({
    //   index: "posts",
    //   title: filterQuery,
    // });
    const { body } = await client.search(
      {
        index: "posts",
        q: `*${filterQuery}*`,
      },
      {
        ignore: [404],
        maxRetries: 3,
      }
    );
    response.json(body);
    // const { body } = await client.search({
    //   index: "posts",
    //   body: {
    //     query: { match_all: {} },
    //   },
    // });

    response.json(body.hits.hits);
  } catch (error) {
    response.status(404).send("Didn't find " + filterQuery);
  }
});

router.delete("/reboot", (request, response) => {
  try {
    let a = 123;
  } catch (error) {}
});
module.exports = router;
