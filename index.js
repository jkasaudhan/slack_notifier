const core = require("@actions/core");
const fetch = require("node-fetch");
(async () => {
  const status = "success";
  try {
    const payload = {
      channel: `${core.getInput("channel")}`,
      attachments: [
        {
          color:
            status === "success"
              ? "#2e993e"
              : status === "failure"
              ? "#bd0f26"
              : "#d29d0c",
          blocks: [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "Github action slack notifier:"
                }
            },
            {
                "type": "section",
                "block_id": "section567",
                "text": {
                    "type": "mrkdwn",
                    "text": "<https://example.com|Overlook Hotel> \n :star: \n Doors had too many axe holes, guest in room 237 was far too rowdy, whole place felt stuck in the 1920s."
                },
                "accessory": {
                    "type": "image",
                    "image_url": "https://is5-ssl.mzstatic.com/image/thumb/Purple3/v4/d3/72/5c/d3725c8f-c642-5d69-1904-aa36e4297885/source/256x256bb.jpg",
                    "alt_text": "Haunted hotel image"
                }
            },
            {
                "type": "section",
                "block_id": "section789",
                "fields": [
                    {
                        "type": "mrkdwn",
                        "text": "*Average Rating*\n1.0"
                    }
                ]
            }

          ],
        },
      ],
    };
    // Call slack api
    const res = await fetch(core.getInput("slack-webhook-url"), {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Content-Length": payload.length,
        Authorization: `Bearer ${core.getInput("slack-bot-token")}`,
        Accept: "application/json",
      },
    });
    if (!res.ok) {
      throw new Error(`Server error ${res.status}`);
    }
    core.setOutput(JSON.stringify(res));
  } catch (error) {
    core.setFailed(error.message);
  }
})();
