package admin

import (
	"github.com/pkg/errors"

	"github.com/18F/e-QIP-prototype/api"
)

// Rejector is used to reject/kickback an application
type Rejector struct {
	db    api.DatabaseService
	store api.StorageService
	pdf   api.PdfService
}

func NewRejector(db api.DatabaseService, store api.StorageService, pdf api.PdfService) Rejector {
	return Rejector{
		db,
		store,
		pdf,
	}
}

// Reject rejects the application for a given account
func (r Rejector) Reject(account api.Account) error {
	err := account.Unlock(r.db)
	if err != nil {
		return errors.Wrap(err, "Reject failed to unlock account")
	}

	// TODO: port over PDF.RemovePdfs.
	// err = r.PDF.RemovePdfs(account)
	// if err != nil {
	// 	return errors.Wrap(err, "Reject failed to remove PDFs")
	// }

	app, loadErr := r.store.LoadApplication(account.ID)
	if loadErr != nil {
		if loadErr == api.ErrApplicationDoesNotExist {
			return nil
		}
		return errors.Wrap(loadErr, "Unable to load application to reject it")
	}

	clearErr := app.ClearNoBranches()
	if clearErr != nil {
		return clearErr
	}

	saveErr := r.store.UpdateApplication(app)
	if saveErr != nil {
		return errors.Wrap(saveErr, "Unable to save application after rejecting it")
	}

	return nil
}
