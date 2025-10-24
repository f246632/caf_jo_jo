#!/bin/bash
# Download images from Google Photos URLs

urls=(
"https://lh3.googleusercontent.com/gps-cs-s/AC9h4npKspGT6IqSkRj5MkkDc_XNDtw5OL9zl2kcm_aW8tBHcQt1v4nRflw_wVQyWt-lkNt-2Dr8klL59JmoMNMAqo5jWbUT1Tqu9O5kkoQtc1vzcsmcrVplh9XfeBYGouWLou9RT_M9lQ=w1920-h1080-k-no"
"https://lh3.googleusercontent.com/gps-cs-s/AC9h4no0OMR-xBSuXgfCqKEZnOq-ShiIyRVKJNQqStZnCSOXdyVlpOOgust09u-pa4O4zn-FO5M96oahmsglaSbJyAfNcF2qPRgEb0wP84C7bHIIDFUwjUqizgmp5EqX8EQCkghndGoEtV6PS4a-=w1920-h1080-k-no"
"https://lh3.googleusercontent.com/gps-cs-s/AC9h4nrMZr6tz17sSJcefldWlgPwN84BbdDiU3gbWTCi7fek-eTaRiwhlGFVR5L6QVHqREuXcDbOG924k6FAHHb-HlfW5sd33F-T0neGb3pc0YmNoDshRPXWGAB7POH00AhsWaTK1hpW=w1920-h1080-k-no"
"https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqs7LBzg794PHGzXE2c4S96BsRRkGgVeFha53eM2FbfeeGQpaXjhrSkxvKnUx6ADSTs3YkzaFMsFNxb1WlXpcEP3EyE8dCPAaENEMhcVkm5PcM250_kRIoOfh9Pqxx8aW9t4dCA4A=w1920-h1080-k-no"
"https://lh3.googleusercontent.com/gps-cs-s/AC9h4noiSBCm8coHM8akeaOfwVx9c9mGcktrXYIJK0EHZ5zIer6C9UDfFZgIxMHolLXeOFBH8E3MHzhAFDC5K3TtAIbtT8LoOQSBwhO2n3eLI4P-ixBqCPIHGM4kY4X0cClp8okbeGbgpvXGYQq_=w1920-h1080-k-no"
"https://lh3.googleusercontent.com/gps-cs-s/AC9h4nr9GWwL19WyVz-doQVsnq_NBJRpzkZ1cVy3olLuMhzyEXj6iceYndAAq_u42Q0u8154X1vME31F57B1AH5_Ozs7zBtcEbOCToEQAygulHVF_j1iWb4s4sb6bJLGbCaqAJF_I-v8=w1920-h1080-k-no"
"https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqrvg7ge8UAJQgx0RL3INGe3hOd7ELsK-DtRNQ9KDEv6OTqHqqzQ_LIaUye0_nsSlKQLNnR958jvpRJtdqQnUj7E_c5QFr0jtLzsM1aPnTT4_h9ii71gUewTbpVH71gkdfoq_qA=w1920-h1080-k-no"
"https://lh3.googleusercontent.com/gps-cs-s/AC9h4noDPZehh3z8UmX_9sborDY52cTyKkrIFMUpxz5nCdOdZBywAmi0lCoO_0p7_9AS-xTuKIvBfpfCBqqJpeNIIVDACwUP5IfjpoeLJbuHUZxQ9iFS0SQjWbU9_cfRyoCFatpv1Amz=w1920-h1080-k-no"
"https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqwoYRBhcWx4FX3VkFV8NYF6jUTr5opthpp6ZMbeGQ6NTFF3DjCBRam6k2rfs9wjZTtsY6j7dRql2mkNoadiOG3k0LHjxO5Png5NMn_CTlp14_nMlMuhfIjODHAcnKwJT4k946p=w1920-h1080-k-no"
"https://lh3.googleusercontent.com/gps-cs-s/AC9h4nrwrUAz-XGoutrs3DWX-ys4X6vCcKwNvFUri10lxSwBJZJfUGw1Vq6na3-_jwwSbStr33XXrrhwAPoCERRshl82eqdrlIc0mSL2ZjZbp1eZg54NmNTqp65ZcyWCcu8FDSUjnN1r=w1920-h1080-k-no"
)

cd "$(dirname "$0")/source"
counter=1

for url in "${urls[@]}"; do
    echo "Downloading image $counter..."
    curl -L -o "cafe-${counter}.jpg" "$url" 2>/dev/null
    counter=$((counter + 1))
done

echo "Downloaded ${#urls[@]} images!"
