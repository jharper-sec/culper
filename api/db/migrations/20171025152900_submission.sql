
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied

CREATE TABLE signatures (
    id         bigint NOT NULL PRIMARY KEY,
    accound_id bigint REFERENCES accounts(id) NOT NULL,
    name_id    bigint REFERENCES names(id),
    date_id    bigint REFERENCES date_controls(id)
);

CREATE TABLE submission_additional_comments (
    id                     bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    additional_comments_id bigint REFERENCES textareas(id),
    signature_id           bigint REFERENCES signatures(id)
);

CREATE TABLE submission_generals (
    id           bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    signature_id bigint REFERENCES signatures(id)
);

CREATE TABLE submission_medicals (
    id           bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    signature_id bigint REFERENCES signatures(id)
);

CREATE TABLE submission_credits (
    id           bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    signature_id bigint REFERENCES signatures(id)
);

CREATE TABLE submissions (
    id                     bigint REFERENCES accounts(id) NOT NULL PRIMARY KEY,
    additional_comments_id bigint REFERENCES submission_additional_comments(id),
    general_id             bigint REFERENCES submission_generals(id),
    medical_id             bigint REFERENCES submission_medicals(id),
    credit_id              bigint REFERENCES submission_credits(id)
);


-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
DROP TABLE submission_credits;
DROP TABLE submission_medicals;
DROP TABLE submission_generals;
DROP TABLE submission_additional_comments;
DROP TABLE submissions;
DROP TABLE signatures;
