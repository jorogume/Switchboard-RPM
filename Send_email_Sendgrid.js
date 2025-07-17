

let { apiKey, emailTo ,emailSubject, emailBody, attachment_link, attachment_filename, cc_email, emailFrom, signature_name, signature_department } = input.config();


let webhookUrl = "https://hooks.zapier.com/hooks/catch/23646884/u3hhqye/";


// 3. Build dynamic data (match template placeholders exactly)
let dynamicData = {
  "subject": `${emailSubject}`,
  "Body": `${emailBody}`,
  "signature_name": `${signature_name}`,
  "signature_department": `${signature_department}`,
  "signature_email": `${emailFrom}`
};

// 4. Construct the SendGrid payload
let emailPayload = {
  from: { email: `${emailFrom}`, name: '${signatur_name}' },
  personalizations: [{
    to: [{ email: `${emailTo}`}],
    dynamic_template_data: dynamicData
  }],
  template_id: "d-6988bf98cd9e442ab8cbdf306bafed03"
};

console.log("🔍 Email payload:", JSON.stringify(emailPayload, null, 2));

// 5. Send via fetch and handle errors
let response = await fetch("https://api.sendgrid.com/v3/mail/send", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${apiKey}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify(emailPayload)
});

if (!response.ok) {
  let errText = await response.text();
  console.error("SendGrid responded with error:", errText);
  throw new Error(`Email send failed (${response.status})`);
}

console.log(" Template email sent successfully");

// If we reach here, email was sent successfully :-)
output.set("subject", emailSubject);
output.set("body", emailBody);
output.set("status", "Sent");
