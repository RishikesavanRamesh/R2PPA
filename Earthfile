VERSION 0.8

FROM ubuntu:22.04

PROJECT earthly-sa/earthly-vs-gha

# 1)    TEST LOCAL - TO TEST THE DOWNLOADS AND FILE LINK LOCATIONS WORKING PYTHON3 HTTP SERVER AT THE ROOT OF THE REPO
# 2) OK:BUILD all binaries - from diff repos indexed
# 3)    build site 
# 4)    push to github ( will be used in the remote trigger on ci on this same repo )

build-all-binaries:
    WORKDIR /binaries
    COPY ../SWERVE-DRIVE/+swerve-bot-humble-packages/build-bed/*.deb .
    # COPY https://github.com/rishikesavanramesh/PROJECT-2/+build-all/binaries .
    # COPY https://github.com/rishikesavanramesh/PROJECT-3/+build-all/binaries .

    SAVE ARTIFACT /binaries


generate-pgp-key:
    WORKDIR /pgp-key
    RUN apt-get update && apt-get install -y gpg
    RUN echo "%echo Generating an example PGP key
Key-Type: RSA
Key-Length: 4096    
Name-Real: example
Name-Email: example@example.com
Expire-Date: 0
%no-ask-passphrase
%no-protection
%commit" > example-pgp-key.batch
    RUN gpg --no-tty --batch --gen-key example-pgp-key.batch
    RUN gpg --armor --export example > pgp-key.public
    RUN gpg --armor --export-secret-keys example > pgp-key.private
    SAVE ARTIFACT pgp-key.public
    SAVE ARTIFACT pgp-key.private



create-apt-repo:
    WORKDIR /apt-repo
    RUN apt-get update && apt-get install -y dpkg-dev
    COPY generate-release.sh /root/bin/.
    RUN mkdir -p ./pool/main/
    RUN mkdir -p ./dists/stable/main/binary-amd64

    COPY +build-all-binaries/binaries/*.deb ./pool/main/binary-amd64/.
    

    # generate Packages and Packages.gz
    RUN dpkg-scanpackages --arch amd64 pool/ > dists/stable/main/binary-amd64/Packages
    RUN cat dists/stable/main/binary-amd64/Packages | gzip -9 > dists/stable/main/binary-amd64/Packages.gz

    # generate Release
    WORKDIR /apt-repo/dists/stable
    RUN /root/bin/generate-release.sh > Release

    # sign Release
    COPY +generate-pgp-key/pgp-key.private /.
    RUN cat /pgp-key.private | gpg --import
    RUN cat /apt-repo/dists/stable/Release | gpg --default-key example -abs > /apt-repo/dists/stable/Release.gpg
    RUN cat /apt-repo/dists/stable/Release | gpg --default-key example -abs --clearsign > /apt-repo/dists/stable/InRelease

    SAVE ARTIFACT /apt-repo



build-site:
    FROM node:20-alpine
    WORKDIR /gh-repo
    COPY +create-apt-repo/apt-repo ./r2ppa/apt-repo
    COPY --dir ./r2ppa-site ./r2ppa-site
    COPY ./generate-packages-list.sh .
    COPY ./index.html .
    COPY +generate-pgp-key/pgp-key.public ./public.key
    WORKDIR /gh-repo/r2ppa-site
    RUN npm install && npm run build:full
    WORKDIR /gh-repo

    SAVE ARTIFACT /gh-repo



build-gh-test-site:
    FROM python:3.8-alpine3.19
    WORKDIR /app
    COPY +build-site/gh-repo ./gh-repo
    WORKDIR /app/gh-repo
    CMD ["python3", "-m", "http.server"]
    SAVE IMAGE gh-test-site:latest


test:
    COPY +generate-pgp-key/pgp-key.public /example.pgp
    COPY docker-compose.yml .
    WITH DOCKER --compose docker-compose.yml --load=gh-test-site:latest=+build-gh-test-site
        RUN \
            echo "deb [arch=amd64 signed-by=/example.pgp] http://127.0.0.1:8000/apt-repo stable main" > /etc/apt/sources.list.d/example.list && \
            apt-get update && \
            apt-get install -y ros-humble-swerve-drive-core && \
            false
            
    END


push-to-gh:
    ARG --required github_token
    WORKDIR /app
    RUN apt-get update && apt-get install -y git
    COPY +build-site/gh-repo ./gh-repo
    WORKDIR /app/gh-repo 
    RUN git config --global user.email "root@buildkitsandbox.earthly"
    RUN git config --global user.name "bot"
    RUN git init
    RUN git add .
    RUN git commit -m "Automated gh-page build"
    RUN git checkout -b gh-page
    RUN git remote add origin https://rishikesavanramesh:$github_token@github.com/rishikesavanramesh/R2PPA.git
    RUN git push -f origin gh-page

